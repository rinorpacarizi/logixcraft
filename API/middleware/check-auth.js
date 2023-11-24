const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS'){
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //AUthorization: 'Bearer TOKEN'
    if (!token) {
      return next(new HttpError("Authentication failed", 401));
    }
    const decodedToken = jwt.verify(token, "secret_code_shush");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    throw new Error("Authentication failed!");
  }
};
