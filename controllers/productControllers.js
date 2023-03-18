const productModel = require("../models/productModel");
const ErrorResponse = require("../utils/errorResponse");

async function getAllProducts(req, res, next) {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.page_size) || 8;
    const skip = (page - 1) * pageSize;
    const totalDocuments = await productModel.countDocuments();
    const totalPages = Math.ceil(totalDocuments / pageSize);

    // Input validation: If there are 4 total pages, the user shouldn't request for the 5th page
    if (page > totalPages) {
      next(new ErrorResponse("Page not found", 404));
    }

    // Fetch products from database
    const products = await productModel.find().skip(skip).limit(pageSize);

    // JSON response
    res.json({
      success: true,
      statusCode: 200,
      response: { products: products, page: page, totalPages: totalPages },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllProducts };
