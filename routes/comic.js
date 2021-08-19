const express = require("express");
const router = express.Router();
const qs = require("qs");
const axios = require("axios");

// Route get comics
router.get("/comics", async (req, res) => {
  console.log("route: /comics");
  console.log(req.query);

  const { limit, skip, title, currentPage } = req.query;
  let queryParams = qs.stringify({
    limit: limit,
    skip: skip,
    title: title,
    apiKey: process.env.API_KEY_MARVEL,
  });
  try {
    let response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?${queryParams}`
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
        title: title,
        apiKey: process.env.API_KEY_MARVEL,
      });
      response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?${queryParams}`
      );
    }
    response.data.currentPage = isCurrentPageExceeded ? 0 : currentPage;
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
