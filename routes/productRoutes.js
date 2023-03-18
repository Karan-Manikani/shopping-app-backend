const express = require("express");
const productControllers = require("../controllers/productControllers");

const router = express.Router();

router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getProductByID);

module.exports = router;
