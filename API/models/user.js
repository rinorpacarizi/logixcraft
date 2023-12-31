const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    password: {type: String, required:true, minlength:8},
    address: {type: String, required:true},
    image: {type: String, required:true},
    personalNum: {type: Number, required:true},
    phoneNumber: {type: Number, required:true},
    role: { type: String, enum: ["Admin", "Supplier", "Customer"], required: true },
})



module.exports = mongoose.model("User", userSchema);