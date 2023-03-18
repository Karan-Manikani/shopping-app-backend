const productData = require("./products_data.json");
const productModel = require("../models/productModel");
const connectToDB = require("../database/connectToDB");

connectToDB();

async function importData() {
  try {
    await productModel.create(productData["data"]);
    return console.log("Data imported successfully");
  } catch (error) {
    return console.log(error);
  }
}

async function deleteData() {
  try {
    await productModel.deleteMany({});
    return console.log("Data deleted successfully");
  } catch (error) {
    return console.log(error);
  }
}

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
