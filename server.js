const express = require("express");
const app = express();

// access website through Web browser : Declare Route
app.get("/", (req, res) => {
  res.send("Hello Node API");
});
app.listen(3000, () => {
  console.log(`Node API app is running on 3000`);
});
