const uuid = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const Supplier = require("../models/supplier");
const Customer = require("../models/customer");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Couldnt get users", 500));
  }
  res.json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return next(new HttpError("Couldnt get supplier", 500));
  }
  res.json({ user: user.toObject({ getters: true }) });
};

const getUserByRole = async (req, res, next) => {
  let users;
  try {
    users = await User.find(
      { role: "Supplier" });
  } catch (err) {
    
    return next(new HttpError("Couldnt get role", 500));
  }
  const suppliers = users.map(user =>({
    name: user.fullName,
    image: user.image
  }))
  res.json({
    users: suppliers,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Login failed!", 500));
  }

  if (!existingUser) {
    return next(new HttpError("Wrong credentials", 401));
  }

  let isValidPassowrd = false;
  try {
    isValidPassowrd = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new HttpError("Couldnt login, check your credentials!", 500));
  }

  if (!isValidPassowrd) {
    return next(new HttpError("Wrong credentials", 401));
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      "secret_code_shush",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Token failed login", 500));
  }
  res.json({
    userId: existingUser.id,
    token: token,
    role: existingUser.role,
    email: existingUser.email,
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid data for user", 422));
  }
  const { fullName, email, password, address, personalNum, phoneNumber, role } =
    req.body;
  let userExists;
  try {
    userExists = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError("There was an issue registering try again!", 500)
    );
  }

  if (userExists) {
    return next(new HttpError("User already exists", 422));
  }
  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Cannot create user", 500));
  }

  const createdUser = new User({
    id: uuid.v4(),
    fullName,
    email,
    password: hashedPassword,
    image: req.file.path,
    address,
    personalNum,
    phoneNumber,
    role,
  });

  let createdRole;

  try {
    if (role === "Supplier") {
      createdRole = new Supplier({ user: createdUser });
    } else if (role === "Customer") {
      createdRole = new Customer({ user: createdUser });
    } else {
      return next(new HttpError("Invalid role", 422));
    }
    await createdUser.save();
    await createdRole.save();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Creating user failed", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "secret_code_shush",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Token failed", 500));
  }

  res
    .status(201)
    .json({
      userId: createdUser.id,
      token: token,
      role: createdUser.role,
      email: createdUser.email,
    });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new HttpError("Couldnt find user", 404));
    }

    const role = user.role;

    const sess = await mongoose.startSession();
    sess.startTransaction();

    if (role === "Supplier") {
      const supplier = await Supplier.findOne({ user: userId });
      if (supplier) {
        await supplier.deleteOne({ session: sess });
      }
    } else if (role === "Customer") {
      const customer = await Customer.findOne({ user: userId });
      if (customer) {
        await customer.deleteOne({ session: sess });
      }
    }
    const productsToDelete = user.products;

    for (const product of productsToDelete) {
      await product.deleteOne({ session: sess });
    }

    await user.deleteOne({ session: sess });
    await sess.commitTransaction();

    res.status(200).json({ message: "User has been deleted" });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Deletion failed", 500));
  }
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.getUserByRole = getUserByRole;
exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
