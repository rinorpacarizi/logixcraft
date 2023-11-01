const uuid = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

let DUMMY_PRODUCTS = [
  {
    id: "p1",
    name: "Juice",
    type: "Consumables",
    price: 1.99,
    amount: { stock: 12, ordered: 6, preOrdered: 0 },
    creator: "u1",
  },
];

const getProductById = (req, res, next) => {
  const productId = req.params.pid; //{pid: 'p1'}
  const product = DUMMY_PRODUCTS.find((p) => {
    return p.id === productId;
  });

  if (!product) {
    return next(new HttpError("Couldnt find the provided productID", 404));
  }
  res.json({ product });
};

const getProductsUserById = (req, res, next) => {
  const userId = req.params.uid; //{uid: 'u1'}
  const products = DUMMY_PRODUCTS.filter((p) => {
    return p.creator === userId;
  });

  if (!products || products.length === 0) {
    return next(new HttpError("Couldnt find the products by that UserID", 404));
  }
  res.json({ products });
};

const createProduct = (req, res, next) => {
  const errors= validationResult(req);
  if(!errors.isEmpty()){
    throw new HttpError("Invalid Data", 422);
  }
  const { name, type, price, amount, creator } = req.body;
  const createdProduct = {
    id: uuid.v4(),
    name,
    type,
    price,
    amount: amount,
    creator,
  };
  DUMMY_PRODUCTS.push(createdProduct);
  console.log(createdProduct);
  res.status(201).json({ product: createProduct });
};

const updateProduct = (req, res, next) => {
  const errors= validationResult(req);
  if(!errors.isEmpty()){
    throw new HttpError("Invalid Updated Data", 422);
  }
  const { name, type, price, amount } = req.body;
  const productId = req.params.pid;

  const updatedProduct = { ...DUMMY_PRODUCTS.find((p) => p.id === productId) };
  const productIndex = DUMMY_PRODUCTS.findIndex((p) => p.id === productId);
  (updatedProduct.name = name),
    (updatedProduct.type = type),
    (updatedProduct.price = price),
    (updatedProduct.amount = amount);

  DUMMY_PRODUCTS[productIndex] = updatedProduct;
  res.status(200).json({ product: updatedProduct });
};

const deleteProduct = (req, res, next) => {
  const productId = req.params.pid;
  if (!DUMMY_PRODUCTS.find(p => p.id === productId)) {
    throw(new HttpError("Couldnt find the product", 404));
  }
  DUMMY_PRODUCTS = DUMMY_PRODUCTS.filter((p) => p.id !== productId);
  res.status(200).json({ message: "Deleted Product" });
};

exports.getProductById = getProductById;
exports.getProductsUserById = getProductsUserById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
