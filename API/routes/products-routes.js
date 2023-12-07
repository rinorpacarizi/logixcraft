const express = require("express");
const productsController = require("../controllers/products-controller");
const { check } = require("express-validator");
const fileUpload = require('../middleware/file-upload')
const checkAuth = require('../middleware/check-auth')

const router = express.Router();


router.get('/', productsController.getProducts)

router.get("/:pid", productsController.getProductById);

router.get("/user/:uid", productsController.getProductsUserById);

router.use(checkAuth);

router.post(
  "/",fileUpload.single('image'),
  [
    check("name").not().isEmpty(),
    check("type").not().isEmpty(),
    check("creator"),
    check("price").not().isEmpty(),
    check("stock").not().isEmpty(),
    check("description").not().isEmpty(),
  ],
  productsController.createProduct
);

router.patch(
  "/:pid",
  [
    check("name").not().isEmpty(),
    check("type").not().isEmpty(),
    check("price").not().isEmpty(),
    check("stock").not().isEmpty(),
    check("description").not().isEmpty(),
    
  ],
  productsController.updateProduct
);

router.delete("/:uid", productsController.deleteProduct);

module.exports = router;
