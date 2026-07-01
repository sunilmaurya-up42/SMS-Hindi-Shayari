/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Shayari Routes
 * -------------------------------------------------------
 */

"use strict";

const express = require("express");
const router = express.Router();

const Shayari = require("../models/Shayari");
const Category = require("../models/Category");

const { optionalAuth } = require("../middleware/auth");
const { paginate } = require("../utils/helpers");
const { asyncHandler } = require("../utils/helpers");

/* ==================================
   All Shayari (Page + API Ready)
================================== */

router.get(
    "/",
    optionalAuth,
    asyncHandler(async (req, res) => {

        const { page, limit, skip } = paginate(req.query.page, 20);

        const shayaries = await Shayari.find({ isActive: true })
            .populate("category", "name slug")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return res.render("pages/shayari/index", {
            title: "All Shayari",
            shayaries,
            page,
            user: req.user || null
        });

    })
);

/* ==================================
   Single Shayari by Slug
================================== */

router.get(
    "/:slug",
    optionalAuth,
    asyncHandler(async (req, res) => {

        const shayari = await Shayari.findOne({
            slug: req.params.slug,
            isActive: true
        }).populate("category");

        if (!shayari) {
            return res.status(404).render("errors/404", {
                title: "Not Found"
            });
        }

        return res.render("pages/shayari/detail", {
            title: shayari.title,
            shayari,
            user: req.user || null
        });

    })
);

/* ==================================
   Category Wise Shayari
================================== */

router.get(
    "/category/:slug",
    optionalAuth,
    asyncHandler(async (req, res) => {

        const category = await Category.findOne({
            slug: req.params.slug
        });

        if (!category) {
            return res.status(404).render("errors/404", {
                title: "Category Not Found"
            });
        }

        const shayaries = await Shayari.find({
            category: category._id,
            isActive: true
        })
            .sort({ createdAt: -1 });

        return res.render("pages/shayari/category", {
            title: category.name,
            category,
            shayaries,
            user: req.user || null
        });

    })
);

/* ==================================
   Search Shayari
================================== */

router.get(
    "/search",
    optionalAuth,
    asyncHandler(async (req, res) => {

        const q = req.query.q || "";

        const shayaries = await Shayari.find({
            isActive: true,
            $or: [
                { title: { $regex: q, $options: "i" } },
                { content: { $regex: q, $options: "i" } }
            ]
        }).limit(50);

        return res.render("pages/shayari/search", {
            title: "Search Results",
            query: q,
            shayaries,
            user: req.user || null
        });

    })
);

/* ==================================
   Export
================================== */

module.exports = router;
