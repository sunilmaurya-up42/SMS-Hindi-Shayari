const express = require("express");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Home Page
|--------------------------------------------------------------------------
*/

router.get("/", (req, res) => {
  res.send("🏠 Home Page");
});

/*
|--------------------------------------------------------------------------
| Language Page
|--------------------------------------------------------------------------
*/

router.get("/language/:language", (req, res) => {
  const { language } = req.params;

  res.send(`Language : ${language}`);
});

/*
|--------------------------------------------------------------------------
| Category Page
|--------------------------------------------------------------------------
*/

router.get("/category/:category", (req, res) => {
  const { category } = req.params;

  res.send(`Category : ${category}`);
});

/*
|--------------------------------------------------------------------------
| Single Shayari
|--------------------------------------------------------------------------
*/

router.get("/shayari/:slug", (req, res) => {
  const { slug } = req.params;

  res.send(`Shayari : ${slug}`);
});

/*
|--------------------------------------------------------------------------
| Search
|--------------------------------------------------------------------------
*/

router.get("/search", (req, res) => {
  const keyword = req.query.q || "";

  res.send(`Search : ${keyword}`);
});

module.exports = router;
