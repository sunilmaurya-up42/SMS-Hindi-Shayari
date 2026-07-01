/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Shayari Routes
 * -------------------------------------------------------
 */

"use strict";

const express = require("express");
const router = express.Router();

const shayariController = require("../controllers/shayari");

const {
    optionalAuth,
    isAuthenticated
} = require("../middleware/auth");

/* ==================================
   All Shayari
================================== */

router.get(
    "/",
    optionalAuth,
    shayariController.allShayari
);

/* ==================================
   Featured Shayari
================================== */

router.get(
    "/featured",
    optionalAuth,
    shayariController.featured
);

/* ==================================
   Trending Shayari
================================== */

router.get(
    "/trending",
    optionalAuth,
    shayariController.trending
);

/* ==================================
   Latest Shayari
================================== */

router.get(
    "/latest",
    optionalAuth,
    shayariController.latest
);

/* ==================================
   Category Wise
================================== */

router.get(
    "/category/:slug",
    optionalAuth,
    shayariController.category
);

/* ==================================
   Search
================================== */

router.get(
    "/search",
    optionalAuth,
    shayariController.search
);

/* ==================================
   Tag Wise
================================== */

router.get(
    "/tag/:tag",
    optionalAuth,
    shayariController.tag
);

/* ==================================
   Language Wise
================================== */

router.get(
    "/language/:language",
    optionalAuth,
    shayariController.language
);

/* ==================================
   Like
================================== */

router.post(
    "/:id/like",
    isAuthenticated,
    shayariController.like
);

/* ==================================
   Download
================================== */

router.post(
    "/:id/download",
    optionalAuth,
    shayariController.download
);

/* ==================================
   Favorite
================================== */

router.post(
    "/:id/favorite",
    isAuthenticated,
    shayariController.favorite
);

router.delete(
    "/:id/favorite",
    isAuthenticated,
    shayariController.removeFavorite
);

/* ==================================
   Share
================================== */

router.post(
    "/:id/share",
    optionalAuth,
    shayariController.share
);

/* ==================================
   Single Shayari
   (Always Keep Last)
================================== */

router.get(
    "/:slug",
    optionalAuth,
    shayariController.singleShayari
);

/* ==================================
   Export
================================== */

module.exports = router;
