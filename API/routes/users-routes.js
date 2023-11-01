const express = require("express");
const usersController = require("../controllers/users-controller");
const { check } = require("express-validator");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
    check("fullName").not().isEmpty(),
    check("email").not().normalizeEmail().isEmail(),
    check("password").not().isLength({min:6}),
    check("address").not().isEmpty(),
    check("role").not().isEmpty(),
    check("personalNum").not().isLength({min:12, max:13}).isEmpty(),
    check("phoneNumber").not().isLength({min:9, max:13}).isEmpty(),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

router.delete("/:uid", usersController.deleteUser);

module.exports = router;
