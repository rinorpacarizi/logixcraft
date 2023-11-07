const uuid = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

let DUMMY_USERS = [
  {
    id: "u1",
    fullName: "Juicy World",
    email: "juicy@gmail.com",
    password: "sad123",
    address: "East Clinton",
    personalNum: 12225006201,
    phoneNumber: 49576876,
    role: "admin",
  },
];

const getUsers = (req, res, next) => {
  res.json({ user: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors= validationResult(req);
  if(!errors.isEmpty()){
    throw new HttpError("Invalid data for user", 422);
  }
  const { fullName, email, password, address, personalNum, phoneNumber, role } =
    req.body;

    const userExists = DUMMY_USERS.find(u =>u.email === email);
    if(userExists){
      throw new HttpError('User already exists', 422);
    }

  const createdUser = {
    id: uuid.v4(),
    fullName,
    email,
    password,
    address,
    personalNum,
    phoneNumber,
    role,
  };
  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
    const {  email, password} = req.body;
    const identifiedUser = DUMMY_USERS.find((p)=> p.email === email)
    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Wrong credentials', 401);
    }
    res.json({message: 'Logged in'});
};

const deleteUser = (req, res, next) => {
  const userId = req.params.uid;
  if (!DUMMY_USERS.find(u => u.id === userId)) {
    throw(new HttpError("Couldnt find the product", 404));
  }
  DUMMY_USERS = DUMMY_USERS.filter((p) => p.id !== userId);
  res.status(200).json({ message: "Deleted User" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
