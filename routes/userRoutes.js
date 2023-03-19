const express = require("express");
const passport = require("passport");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.post("/login", userControllers.login);
router.post("/register", userControllers.register);
router.get("/me", passport.authenticate("jwt", { session: false }), userControllers.getUserProfile);
router.delete("/me", passport.authenticate("jwt", { session: false }), userControllers.deleteUserProfile);
router.patch("/cart/add", passport.authenticate("jwt", { session: false }), userControllers.addToCart);
router.patch("/cart/remove", passport.authenticate("jwt", { session: false }), userControllers.RemoveFromCart);

module.exports = router;
