const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: [true, "Please enter a category"],
    },
    published: {
      type: Boolean,
      required: true,
    },
  },
  {
    // it is used to track when data is saved to the Database and when it is modified
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
