const fs = require('fs'); 
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Product = require("../models/product");
const Customer = require("../models/customer");
const Order = require("../models/order");

const getOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find();
  } catch (err) {
    return next(new HttpError("Couldnt find orders", 500));
  }
  res.json({
    orders: orders.map((orders) => orders.toObject({ getters: true })),
  });
};

const getOrderById = async (req, res, next) => {
  const orderId = req.params.oid;
  let order;

  try {
    order = await Order.findById(orderId);
  } catch (err) {
    return next(new HttpError("Couldnt find order", 404));
  }

  if (!order) {
    return next(new HttpError("Couldnt find the provided orderID", 404));
  }
  res.json({ order: order.toObject({ getters: true }) });
};

const getOrdersUserById = async (req, res, next) => {
  const userId = req.params.uid;
  let orders;
  try {
    orders = await Order.find({ creator: userId });
  } catch (err) {
    console.log(err)
    return next(new HttpError("Couldnt find orders of user", 404));
  }

  // if (!products || products.length === 0) {
  //   return next(new HttpError("Couldnt find the products by that UserID", 404));
  // }
  res.json({
    orders: orders.map((order) => order.toObject({ getters: true })),
  });
};

const createOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return next(new HttpError("Invalid Data", 422));
  }
  const { amount, price, status } = req.body;

  let product;
  let customer;
  try {
    product = await Product.findOne({ name: req.body.productName });
    customer = await Customer.findOne({ user: req.userData.userId });
    if (!product) {
      return next(new HttpError("Product not found", 404));
    }
  } catch (err) {
    return next(new HttpError("Error finding product", 500));
  }

  const createdOrder = new Order({
    amount,
    price,
    image: product.image,
    status,
    productName: product.name,
    creator: customer.user,
    customer: customer._id,
  });
  try {
    if (!product) {
      return next(new HttpError("ProductID doesnt exits", 404));
    }
  } catch (err) {
    console.log(err)
    return next(new HttpError("Please try the productID again", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdOrder.save({ session: sess });
    product.stock -= createdOrder.amount;
    customer.orders.push(createdOrder);
    await customer.save({ session: sess });
  await product.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("Creating order failed", 500));
  }

  res.status(201).json({ order: createdOrder });
};

const updateOrderStatus = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Updated Data", 422));
  }
  const { status } = req.body;
  const orderId = req.params.oid;

  let order;

  try {
    order = await Order.findById(orderId);
  } catch {
    return next(new HttpError("Updating order failed", 500));
  }

  if(order.creator.toString() !== req.userData.userId){
    return next(new HttpError("You cant edit this order", 401));
  }
  order.status = status;

  try {
    await order.save();
  } catch {
    return next(new HttpError("Updating order failed", 500));
  }

  res.status(200).json({ order: order.toObject({ getters: true }) });
};

const updateOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Updated Data", 422));
  }
  const { amount, price, status } = req.body;
  const orderId = req.params.oid;

  let order;

  try {
    order = await Order.findById(orderId);
  } catch {
    return next(new HttpError("Updating order failed", 500));
  }

  if(order.creator.toString() !== req.userData.userId){
    return next(new HttpError("You cant edit this order", 401));
  }

  order.amount = amount;
  order.price = price;
  order.status = status;

  try {
    await order.save();
  } catch {
    return next(new HttpError("Updating order failed", 500));
  }

  res.status(200).json({ order: order.toObject({ getters: true }) });
};

const deleteOrder = async (req, res, next) => {
  const orderId = req.params.oid;
  let order;
  let product;
  try {
    order = await Order.findById(orderId).populate("customer");
    product = await Product.findOne({ name: order.productName });

    if (!order || !product ){
      return next(new HttpError("Order not found", 404));
    }
    product.stock += order.amount;

    const sess = await mongoose.startSession();
    sess.startTransaction();

   
    await product.save({ session: sess });
    await order.customer.orders.pull(order);
    await order.deleteOne({ session: sess });

    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Deleting order failed", 500));
  }

  if (order.creator.toString() !== req.userData.userId) {
    return next(new HttpError("You can't delete this order", 401));
  }

  res.status(200).json({ message: "Deleted Order" });
};



exports.getOrders = getOrders;
exports.getOrderById = getOrderById;
exports.getOrdersUserById = getOrdersUserById;
exports.createOrder = createOrder;
exports.updateOrder = updateOrder;
exports.updateOrderStatus = updateOrderStatus;
exports.deleteOrder = deleteOrder;
