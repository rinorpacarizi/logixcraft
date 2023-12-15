const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  orders:[{ type: mongoose.Types.ObjectId, require: false, ref: "Order" }],
});


module.exports = mongoose.model("Customer", customerSchema);
