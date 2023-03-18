const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address.");
      }
    },
  },
  password: { type: String, required: true, minLength: [6, "Password too short."] },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };
