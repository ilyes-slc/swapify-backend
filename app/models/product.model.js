const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        name: String,
        description: String,
        price: Number,
        imageName: String,
        // You can add more properties as needed
    })
);

module.exports = Product;
