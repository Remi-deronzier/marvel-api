const mongoose = require("mongoose");

const Bookmark = mongoose.model("Bookmark", {
  name: String,
  title: String,
  description: String,
  thumbnail_path: String,
  thumbnail_extension: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Bookmark;
