const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  amount: { type: String, require: true },
  price: { type: String, require: true },
  image: { type: String, require: true },
  status:{ type: String, require: true },
  creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  customer: { type: mongoose.Types.ObjectId, ref: "Customer", required: true },
  product: [{ type: mongoose.Types.ObjectId, require: false, ref: "Product" }],
});

orderSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Order", orderSchema);
