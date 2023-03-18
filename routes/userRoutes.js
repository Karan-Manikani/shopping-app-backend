const express = require("express");
const auth = require("../middleware/auth");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.post("/login", userControllers.login);
router.get("/me", auth, userControllers.getUserProfile);
router.post("/register", userControllers.register);

module.exports = router;
