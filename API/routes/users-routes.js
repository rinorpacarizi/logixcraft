const express = require("express");
const usersController = require("../controllers/users-controller");
const { check } = require("express-validator");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
    check("fullName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("address").not().isEmpty(),
    check("personalNum").isLength({ min: 12, max: 13 }), 
    check("phoneNumber").isLength({ min: 9, max: 13 }), 
    check("products"), 
  ],
  usersController.signup
);

router.post("/login", usersController.login);

router.delete("/:uid", usersController.deleteUser);

module.exports = router;
