const express = require("express");
const productsController = require("../controllers/products-controller");
const { check } = require("express-validator");

const router = express.Router();

router.get("/:pid", productsController.getProductById);

router.get("/user/:uid", productsController.getProductsUserById);

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("type").not().isEmpty(),
    check("creator").not().isEmpty(),
    check("price").not().isEmpty(),
    check("amount").not().isEmpty()
  ],
  productsController.createProduct
);

router.patch(
  "/:pid",
  [
    check("name").not().isEmpty(),
    check("type").not().isEmpty(),
    check("price").not().isEmpty(),
    check("amount").not().isEmpty()
  ],
  productsController.updateProduct
);

router.delete("/:pid", productsController.deleteProduct);

module.exports = router;
