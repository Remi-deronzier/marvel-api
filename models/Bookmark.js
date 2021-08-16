const mongoose = require("mongoose");

const Bookmark = mongoose.model("Bookmark", {
  name: String,
  title: String,
  description: String,
  thumbnail: { type: mongoose.Schema.Types.Mixed, default: {} },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Bookmark;
