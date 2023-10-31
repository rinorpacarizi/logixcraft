const express = require("express");
const productsController = require("../controllers/product-controller");

const router = express.Router();

router.get("/:pid", productsController.getProductById);

router.get("/user/:uid", productsController.getProductUserById);

router.post("/", productsController.createProduct);

router.patch("/:pid", productsController.updateProduct);

router.delete("/:pid", productsController.deleteProduct);

module.exports = router;
