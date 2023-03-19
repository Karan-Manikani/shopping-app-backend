const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const ErrorResponse = require("../utils/errorResponse");

async function register(req, res, next) {
  const { email } = req.body;
  try {
    // The email address needs to be unique to each user, hence we throw an error if the user is trying to create an account with an email that already exists in the database.
    const user = await userModel.findOne({ email });
    if (user) {
      next(new ErrorResponse("Email already exists", 409));
    }

    // Create the new user and save it on the database.
    const newUser = await userModel(req.body);
    await newUser.save();

    // Once the user has been saved to the database, we generate a JWT auth token that is unique to the user send it back to the client.
    const token = newUser.generateAuthToken();
    res.json({
      success: true,
      statusCode: 201,
      response: newUser,
      token: "Bearer " + token,
      message: "Your account has been successfully created",
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    // Try to find a user by their email.
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid email or password", 401));
    }

    // Compare the password entered to the hashed password in the database
    const passwordsMatch = await user.isMatch(password);
    if (!passwordsMatch) {
      return next(new ErrorResponse("Invalid email or password", 401));
    }

    // Generate the auth token and send it back to the client.
    const token = user.generateAuthToken();
    res.json({
      success: true,
      statusCode: 200,
      response: user,
      token: "Bearer " + token,
      message: "Logged in successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function getUserProfile(req, res, next) {
  try {
    res.json({
      success: true,
      statusCode: 200,
      response: req.user,
    });
  } catch (error) {
    next(error);
  }
}

async function addToCart(req, res, next) {
  const { productId } = req.body;
  try {
    // Find the product by id and check if they exist in the database
    const product = await productModel.findById(productId);
    if (!product) {
      return next(new ErrorResponse(`Product with ID ${productId} was not found.`, 404));
    }

    // Check if the product already exists in the user's cart. If it doesn't then we add it to the array, otherwise we throw an error
    const productInCart = req.user.cart.find((item) => item.toString() === productId);
    if (productInCart) {
      return next(new ErrorResponse("Product already exists in the cart", 403));
    }
    req.user.cart.push(product._id);

    // Save the changes onto the database
    await req.user.save();
    res.json({
      success: true,
      statusCode: 200,
      response: req.user,
      message: "Product added to cart",
    });
  } catch (error) {
    next(error);
  }
}

async function RemoveFromCart(req, res, next) {
  const { productId } = req.body;
  try {
    // Find the product by id and check if they exist in the database
    const product = await productModel.findById(productId);
    if (!product) {
      return next(new ErrorResponse(`Product with ID ${productId} was not found.`, 404));
    }

    // Check if the product already exists in the user's cart. If it does then we filter it out of the array, otherwise we throw an error
    const productInCart = req.user.cart.find((item) => item.toString() === productId);
    if (!productInCart) {
      return next(new ErrorResponse("Product does not exist in the cart", 403));
    }
    req.user.cart = req.user.cart.filter((item) => item.toString() !== productId);

    // Save the changes onto the database
    await req.user.save();
    res.json({
      success: true,
      statusCode: 200,
      response: req.user,
      message: "Product removed from cart",
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUserProfile(req, res, next) {
  try {
    await req.user.remove();
    res.json({
      success: true,
      statusCode: 200,
      response: "Deleted successfully",
      message: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, getUserProfile, addToCart, RemoveFromCart, deleteUserProfile };
