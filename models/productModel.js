const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  images: [{ type: String, required: true }],
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
