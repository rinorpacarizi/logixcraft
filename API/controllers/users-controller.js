const uuid = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Supplier = require("../models/supplier");
const { default: mongoose } = require("mongoose");


const getUsers = async (req, res, next) => {
  let suppliers;
  try {
    suppliers = await Supplier.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Couldnt get users", 500));
  }
  res.json({
    suppliers: suppliers.map((supplier) =>
      supplier.toObject({ getters: true })
    ),
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid data for user", 422));
  }
  const {
    fullName,
    email,
    password,
    address,
    personalNum,
    phoneNumber,
    
  } = req.body;
  let userExists;
  try {
    userExists = await Supplier.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError("There was an issue registering try again!", 500)
    );
  }

  if (userExists) {
    return next(new HttpError("User already exists", 422));
  }

  const createdUser = new Supplier({
    id: uuid.v4(),
    fullName,
    email,
    password,
    image:
      "https://imgs.search.brave.com/PzngAPChR2G1EghyNpeb6l57-C-wwF0B_VXbrqZORFw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzE5LzI2LzQ2/LzM2MF9GXzYxOTI2/NDY4MF94MlBCZEdM/RjU0c0ZlN2tUQnRB/dlpuUHlYZ3ZhUncw/WS5qcGc",
    address,
    personalNum,
    phoneNumber,
    products: []
  });
  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Creating user failed", 500));
  }


  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let userExists;
  try {
    userExists = await Supplier.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Login failed!", 500));
  }

  if (!userExists || userExists.password !== password) {
    return next(new HttpError("Wrong credentials", 401));
  }
  res.json({ message: "Logged in" });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;
  try{
    const supplier = await Supplier.findById(userId).populate('products');

    if(!supplier){
      return next(new HttpError('Couldnt find supplier', 404));
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();
    const productsToDelete = supplier.products;

    
    for (const product of productsToDelete) {
      await product.deleteOne({ session: sess });
    }

    await supplier.deleteOne({ session: sess });
    await sess.commitTransaction();

    res.status(200).json({message: 'User has been deleted'})
  }catch(err){
    console.log(err)
    return next(new HttpError('Deletion failed', 500));
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
