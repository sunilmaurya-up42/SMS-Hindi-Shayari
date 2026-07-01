
/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Main Routes
 * -------------------------------------------------------
 */

"use strict";

const express = require("express");
const router = express.Router();

const shayariController = require("../controllers/shayari");
const categoryController = require("../controllers/page");
const { optionalAuth } = require("../middleware/auth");

/* ==================================
   Home Page
================================== */

router.get("/", optionalAuth, async (req, res, next) => {
    try {
        return res.render("pages/home", {
            title: "SMS Hindi Shayari",
            user: req.user || null
        });
    } catch (err) {
        next(err);
    }
});

/* ==================================
   All Shayari List
================================== */

router.get("/shayari", optionalAuth, async (req, res, next) => {
    try {
        return res.render("pages/shayari/index", {
            title: "All Shayari",
            user: req.user || null
        });
    } catch (err) {
        next(err);
    }
});

/* ==================================
   Single Shayari Page (SEO Slug)
================================== */

router.get("/shayari/:slug", optionalAuth, async (req, res, next) => {
    try {
        const slug = req.params.slug;

        return res.render("pages/shayari/detail", {
            title: "Shayari Detail",
            slug,
            user: req.user || null
        });
    } catch (err) {
        next(err);
    }
});

/* ==================================
   Category Page
================================== */

router.get("/category/:slug", optionalAuth, async (req, res, next) => {
    try {
        const slug = req.params.slug;

        return res.render("pages/category/detail", {
            title: "Category",
            slug,
            user: req.user || null
        });
    } catch (err) {
        next(err);
    }
});

/* ==================================
   Search Page
================================== */

router.get("/search", optionalAuth, async (req, res, next) => {
    try {

        const q = req.query.q || "";

        return res.render("pages/search", {
            title: "Search Shayari",
            query: q,
            user: req.user || null
        });

    } catch (err) {
        next(err);
    }
});

/* ==================================
   Static Pages
================================== */

router.get("/about", optionalAuth, (req, res) => {
    res.render("pages/about", {
        title: "About Us",
        user: req.user || null
    });
});

router.get("/contact", optionalAuth, (req, res) => {
    res.render("pages/contact", {
        title: "Contact Us",
        user: req.user || null
    });
});

router.get("/privacy-policy", optionalAuth, (req, res) => {
    res.render("pages/privacy", {
        title: "Privacy Policy",
        user: req.user || null
    });
});

router.get("/terms", optionalAuth, (req, res) => {
    res.render("pages/terms", {
        title: "Terms & Conditions",
        user: req.user || null
    });
});

router.get("/disclaimer", optionalAuth, (req, res) => {
    res.render("pages/disclaimer", {
        title: "Disclaimer",
        user: req.user || null
    });
});

/* ==================================
   Export
================================== */

module.exports = router;
