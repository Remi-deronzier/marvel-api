const express = require("express");
const mongoose = require("mongoose");
const formidable = require("express-formidable");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Import routes
const userRoutes = require("./routes/user");
app.use(userRoutes);
const characterRoutes = require("./routes/character");
app.use(characterRoutes);
const comicRoutes = require("./routes/comic");
app.use(comicRoutes);
const bookmarkRoutes = require("./routes/bookmark");
app.use(bookmarkRoutes);

// Start server + Page not found + Welcome page
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Remi's Marvel API" });
});

app.all("*", (req, res) => {
  console.log("route: /all routes");
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
