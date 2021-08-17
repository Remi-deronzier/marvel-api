const express = require("express");
const router = express.Router();
const axios = require("axios");

const Bookmark = require("../models/Bookmark");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Route create a bookmark
router.post("/bookmarks/create", isAuthenticated, async (req, res) => {
  console.log("route: /bookmarks");
  console.log(req.fields);
  try {
    const { name, title, description, thumbnail_path, thumbnail_extension } =
      req.fields;
    if (name && title) {
      if (await Bookmark.findOne({ name: name, author: req.user })) {
        res.status(409).json({ message: "Change the name of this bookmark" });
      } else {
        const newBookmark = new Bookmark({
          name: name,
          title: title,
          description: description,
          thumbnail_path: thumbnail_path,
          thumbnail_extension: thumbnail_extension,
          author: req.user,
        });
        await newBookmark.save();
        res.status(200).json(newBookmark);
      }
    } else {
      res.status(400).json({
        message: "You must specify a name, a description and a title",
      });
    }
  } catch (error) {
    console.error(error.message);
  }
});

// Route get bookmarks
router.get("/bookmarks", isAuthenticated, async (req, res) => {
  console.log("route: /bookmarks");
  try {
    const response = await Bookmark.find();
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
  }
});

// Route get a specific bookmark
router.get("/bookmark/:id", isAuthenticated, async (req, res) => {
  console.log("route: /bookmark/:id");
  console.log(req.params);
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    res.status(200).json(bookmark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route get all the bookmarks from a specific user
router.get("/bookmarks/user/:id", isAuthenticated, async (req, res) => {
  console.log("route: /bookmarks/user/:id");
  console.log(req.params);
  try {
    const bookmarks = await Bookmark.find({ author: req.params.id });
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
