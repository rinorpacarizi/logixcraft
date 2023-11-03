const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, require: true },
  type: { type: String, require: true },
  image: { type: String, require: true },
  price: { type: Number, require: true },
  amount: {
    stock: { type: Number, require: true },
    ordered: { type: Number, require: true },
    preOrdered: { type: Number, require: true },
  },
  creator: { type: String, require: true },
});

module.exports = mongoose.model("Product", productSchema);
