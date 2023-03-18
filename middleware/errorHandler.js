function errorHandler(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;

  console.log(err);
  console.log(err.code);
  console.log(err.name);

  res.status(error.statusCode || 500).json({
    success: false,
    statusCode: error.statusCode || 500,
    response: error.message || "Server error",
  });
}

module.exports = errorHandler;
