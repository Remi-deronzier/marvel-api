const express = require("express");
const router = express.Router();
const qs = require("qs");
const axios = require("axios");

// Route get characters
router.get("/characters", async (req, res) => {
  console.log("route: /characters");
  console.log(req.query);
  const { limit, skip, name, currentPage } = req.query;
  let queryParams = qs.stringify({
    limit: limit,
    skip: skip,
    name: name,
    apiKey: process.env.API_KEY_MARVEL,
  });
  try {
    let response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?${queryParams}`
    );
    const pageCount = Math.ceil(response.data.count / limit);
    const isCurrentPageExceeded = Number(currentPage) > pageCount; // manage the following problems:
    // - a user changes the limit but is on a high page number which would render nothing
    // - a user makes a research but is on a high page number which would render nothing
    // To prevent to render nothing, we redirect the user on the first page by setting the variable `skip` to 0
    if (isCurrentPageExceeded) {
      queryParams = qs.stringify({
        limit: limit,
        skip: 0,
        name: name,
        apiKey: process.env.API_KEY_MARVEL,
      });
      response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?${queryParams}`
      );
    }
    response.data.currentPage = isCurrentPageExceeded ? 0 : currentPage;
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
