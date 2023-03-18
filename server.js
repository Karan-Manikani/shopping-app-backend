require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/connectToDB");
const productRouter = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

// Connect to DB
connectToDB();

const app = express();

// Express middleware
app.use(express.json());

// Routes
app.use("/api/products", productRouter);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
