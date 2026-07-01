const express = require("express");

const router = express.Router();

const publicController = require("../controllers/publicController");

router.get("/", publicController.home);

router.get("/language/:language", publicController.language);

router.get("/category/:category", publicController.category);

router.get("/shayari/:slug", publicController.shayari);

router.get("/search", publicController.search);

module.exports = router;
