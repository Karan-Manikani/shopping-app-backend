require("dotenv").config();
const cors = require("cors");
const express = require("express");
const passport = require("passport");
const userRouter = require("./routes/userRoutes");
const connectToDB = require("./database/connectToDB");
const productRouter = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

// Connect to DB
connectToDB();

const app = express();

// Express middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
require("./middleware/auth")(passport);

// Routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
