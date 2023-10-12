const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a category name"],
    },
  },
  {
    // it is used to track when data is saved to the Database and when it is modified
    timestamps: true,
  }
);

const Categories = mongoose.model("Categories", categorySchema);
module.exports = Categories;
