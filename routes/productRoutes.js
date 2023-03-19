const express = require("express");
const productControllers = require("../controllers/productControllers");

const router = express.Router();

router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getProductByID);
router.post("/multiple", productControllers.getMultipleProductsById);

module.exports = router;
