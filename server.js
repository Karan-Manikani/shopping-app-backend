require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/connectToDB");

// Connect to DB
connectToDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
