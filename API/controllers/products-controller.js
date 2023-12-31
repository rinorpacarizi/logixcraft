const fs = require('fs'); 
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Product = require("../models/product");
const Supplier = require("../models/supplier");
const User = require("../models/user");
const Order = require("../models/order");

const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    return next(new HttpError("Couldnt find products", 500));
  }
  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const getProductById = async (req, res, next) => {
  const productId = req.params.pid;
  let product;

  try {
    product = await Product.findById(productId);
  } catch (err) {
    return next(new HttpError("Couldnt find product", 404));
  }

  if (!product) {
    return next(new HttpError("Couldnt find the provided productID", 404));
  }
  res.json({ product: product.toObject({ getters: true }) });
};

const getProductsUserById = async (req, res, next) => {
  const userId = req.params.uid;
  let products;

  try {
    products = await Product.find({ creator: userId });
  } catch (err) {
    return next(new HttpError("Couldnt find products of user", 404));
  }

  // if (!products || products.length === 0) {
  //   return next(new HttpError("Couldnt find the products by that UserID", 404));
  // }
  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Data", 422));
  }
  const { name, type, price, stock, description } = req.body;
 
  let supplier;
  try {
    supplier = await Supplier.findOne({ user: req.userData.userId });
    if (!supplier) {
      return next(new HttpError("Supplier not found", 404));
    }
  } catch (err) {
    return next(new HttpError("Error finding supplier", 500));
  }

  const createdProduct = new Product({
    name,
    type,
    image: req.file.path,
    price,
    stock,
    description,
    creator: supplier.user,
    supplier: supplier._id
  });
  try {
    if (!supplier) {
      return next(new HttpError("UserID doesnt exits", 404));
    }
  } catch (err) {
    return next(new HttpError("Please try the userID again", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProduct.save({ session: sess });
    supplier.products.push(createdProduct);
    await supplier.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err)
    return next(new HttpError("Creating product failed", 500));
  }

  res.status(201).json({ product: createdProduct });
};

const updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Updated Data", 422));
  }
  const { name, type, price, stock, description } = req.body;
  const productId = req.params.pid;

  let product;

  try {
    product = await Product.findById(productId);
  } catch {
    return next(new HttpError("Updating product failed", 500));
  }
  if(product.creator.toString() !== req.userData.userId){
    return next(new HttpError("You cant edit this product", 401));
  }

  product.name = name;
  product.type = type;
  product.price = price;
  product.stock = stock;
  product.description = description;

  try {
    await product.save();
  } catch {
    return next(new HttpError("Updating product failed", 500));
  }

  res.status(200).json({ product: product.toObject({ getters: true }) });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.uid;
  let product;
  try {
    product = await Product.findById(productId).populate("supplier");
    
    if (!product) {
      return next(new HttpError("Product not found", 404));
    }
    
    const orders = await Order.find({ productName: product.name }).populate('customer');

    const sess = await mongoose.startSession();
    sess.startTransaction();


    for (const order of orders) {
      await order.customer.orders.pull(order);
      await order.deleteOne({ session: sess });
    }

    await product.supplier.products.pull(product);
    
    await product.supplier.save({ session: sess });
    await product.deleteOne({ session: sess });
    await sess.commitTransaction();
    
  } catch (error) {
    console.log(error)
    return next(new HttpError("Deleting product failed", 500));
  }

if(product.creator.toString() !== req.userData.userId){
  return next(new HttpError("You cant delete this product", 401));
}

  const imagePath = product.image;
  fs.unlink(imagePath, err =>{
    console.log(err);
  })
  console.log(imagePath)
  res.status(200).json({ message: "Deleted Product" });
};

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.getProductsUserById = getProductsUserById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
