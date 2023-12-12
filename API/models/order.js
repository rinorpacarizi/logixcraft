const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  amount: { type: Number, require: true },
  price: { type: Number, require: true },
  image: { type: String, require: true },
  status:{ type: String, require: true },
  productName: { type: String, require: true },
  creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  customer: { type: mongoose.Types.ObjectId, ref: "Customer", required: true },
});

orderSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Order", orderSchema);
