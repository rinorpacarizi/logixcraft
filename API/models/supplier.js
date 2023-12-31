const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  products: [{ type: mongoose.Types.ObjectId, require: false, ref: "Product" }],
});


module.exports = mongoose.model("Supplier", supplierSchema);
