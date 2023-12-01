const express = require("express");
const ordersController = require("../controllers/orders-controller");
const { check } = require("express-validator");
const fileUpload = require('../middleware/file-upload')
const checkAuth = require('../middleware/check-auth')

const router = express.Router();


router.get('/', ordersController.getOrders)

router.get("/:oid", ordersController.getOrderById);

router.get("/user/:uid", ordersController.getOrdersUserById);

router.use(checkAuth);

router.post(
  "/",fileUpload.single('image'),
  [
    check("amount").not().isEmpty(),
    check("price").not().isEmpty(),
    check("status").not().isEmpty(),
    check("product").not().isEmpty(),
    check("user"),
  ],
  ordersController.createOrder
);

router.patch(
  "/:oid",
  [
    check("amount").not().isEmpty(),
    check("price").not().isEmpty(),
    check("status").not().isEmpty()
  ],
  ordersController.updateProduct
);

router.delete("/:uid", ordersController.deleteProduct);

module.exports = router;
