const uuid = require("uuid");
const HttpError = require("../models/http-error");

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

const getProductUserById = (req, res, next) => {
  const userId = req.params.uid; //{uid: 'u1'}
  const product = DUMMY_PRODUCTS.find((p) => {
    return p.creator === userId;
  });

  if (!product) {
    return next(new HttpError("Couldnt find the provided userID", 404));
  }
  res.json({ product });
};

const createProduct = (req, res, next) => {
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
  const { name ,type, price, amount } = req.body;
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
    const productId  =req.params.pid;
    DUMMY_PRODUCTS = DUMMY_PRODUCTS.filter(p => p.id !== productId)
    res.status(200).json({message: 'Deleted Product'});
};

exports.getProductById = getProductById;
exports.getProductUserById = getProductUserById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
