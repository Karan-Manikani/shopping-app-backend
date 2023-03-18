const userModel = require("../models/userModel");
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

module.exports = { register, login };
