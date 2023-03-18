require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

async function auth(req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ id: decoded.id });
    if (!user) {
      return next(new ErrorResponse("Couldn't find user", 404));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new ErrorResponse("Unauthorized", 401));
  }
}

module.exports = auth;
