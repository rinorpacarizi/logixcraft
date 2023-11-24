const express = require("express");
const usersController = require("../controllers/users-controller");
const { check } = require("express-validator");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("fullName"),
    check("email"),
    check("password"),
    check("address"),
    check("personalNum"),
    check("phoneNumber"),
    check("products"),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

router.delete("/:uid", usersController.deleteUser);

module.exports = router;
