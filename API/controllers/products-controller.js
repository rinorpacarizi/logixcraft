const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Product = require("../models/product");
const Supplier = require("../models/supplier");
const supplier = require("../models/supplier");
const product = require("../models/product");

const getProducts= async (req,res,next) =>{
  let products;
  try{
    products = await Product.find();
  }catch(err){
    return next(new HttpError('Couldnt find products', 500))
  };
  res.json({products: products.map(product => product.toObject({getters:true}))})
}

const getProductById = async (req, res, next) => {
  const productId = req.params.pid; //{pid: 'p1'}
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

  if (!products || products.length === 0) {
    return next(new HttpError("Couldnt find the products by that UserID", 404));
  }
  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Data", 422));
  }
  const { name, type, price, amount, creator } = req.body;
  const { stock, ordered, preOrdered } = amount;
  const createdProduct = new Product({
    name,
    type,
    image:
      "https://imgs.search.brave.com/PBTntkTeAqnFnCRZR53htMeFVAA1RBhX2bTGJ-9Vrq8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9xdWlj/a2J1dGlrLmltZ2l4/Lm5ldC8xODQwVi9w/cm9kdWN0cy82MzEy/MTYyMWI2NmViLmpw/ZWc_YXV0bz1mb3Jt/YXQ",
    price,
    amount: {
      stock,
      ordered,
      preOrdered,
    },
    creator,
  });

  let supplier;

  try {
    supplier = await Supplier.findById(creator);
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
    console.log(err);
    return next(new HttpError("Creating product failed", 500));
  }

  res.status(201).json({ product: createdProduct });
};

const updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Updated Data", 422));
  }
  const { name, type, price, amount } = req.body;
  const { stock, ordered, preOrdered } = amount;
  const productId = req.params.pid;

  let product;

  try {
    product = await Product.findById(productId);
  } catch {
    return next(new HttpError("Updating product failed", 500));
  }

  product.name = name;
  product.type = type;
  product.price = price;
  product.amount.stock = stock;
  product.amount.ordered = ordered;
  product.amount.preOrdered = preOrdered;

  try {
    await product.save();
  } catch {
    return next(new HttpError("Updating product failed", 500));
  }

  res.status(200).json({ product: product.toObject({ getters: true }) });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.uid;
  try {
    const product = await Product.findById(productId).populate("creator");
    if (!product) {
      return next(new HttpError("Product not found", 404));
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();
    product.creator.products.pull(product);

    await product.creator.save({ session: sess });
    await product.deleteOne({ session: sess });
    await sess.commitTransaction();

    res.status(200).json({ message: "Deleted Product" });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Deleting product failed", 500));
  }
};

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.getProductsUserById = getProductsUserById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
