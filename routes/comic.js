const express = require("express");
const router = express.Router();
const qs = require("qs");
const axios = require("axios");

// Route get comics
router.get("/comics", async (req, res) => {
  console.log("route: /comics");
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
      `https://lereacteur-marvel-api.herokuapp.com/comics?${queryParams}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);
  }
});

// Route comics specific to a character
router.get("/comics/:id", async (req, res) => {
  console.log("route: /comics/:id");
  console.log(req.params);
  const id = req.params.id;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${process.env.API_KEY_MARVEL}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
