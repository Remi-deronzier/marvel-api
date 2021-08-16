const express = require("express");
const router = express.Router();
const qs = require("qs");
const axios = require("axios");

// Route get characters
router.get("/characters", async (req, res) => {
  console.log("route: /characters");
  console.log(req.query);
  const { limit, skip, title } = req.query;
  const queryParams = qs.stringify({
    limit: limit,
    skip: skip,
    title: title,
    apiKey: process.env.API_KEY_MARVEL,
  });
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?${queryParams}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
