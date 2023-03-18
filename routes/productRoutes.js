const express = require("express");
const productControllers = require("../controllers/productControllers");

const router = express.Router();

router.get("/", productControllers.getAllProducts);

module.exports = router;
