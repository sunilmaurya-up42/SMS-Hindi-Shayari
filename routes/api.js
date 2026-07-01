/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * API Routes (JSON Backend)
 * -------------------------------------------------------
 */

"use strict";

const express = require("express");
const router = express.Router();

/* Models */
const Shayari = require("../models/Shayari");
const Category = require("../models/Category");
const Comment = require("../models/Comment");
const Favorite = require("../models/Favorite");
const Download = require("../models/Download");

/* Middleware */
const { optionalAuth } = require("../middleware/auth");
const { isAuthenticated } = require("../middleware/auth");
const { validateComment } = require("../middleware/validation");
const { asyncHandler } = require("../utils/helpers");

/* ==================================
   All Shayari API
================================== */

router.get(
    "/shayari",
    optionalAuth,
    asyncHandler(async (req, res) => {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const data = await Shayari.find({ isActive: true })
            .populate("category", "name slug")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            success: true,
            page,
            data
        });

    })
);

/* ==================================
   Single Shayari API
================================== */

router.get(
    "/shayari/:slug",
    optionalAuth,
    asyncHandler(async (req, res) => {

        const data = await Shayari.findOne({
            slug: req.params.slug,
            isActive: true
        }).populate("category");

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Shayari not found"
            });
        }

        res.json({
            success: true,
            data
        });

    })
);

/* ==================================
   Category API
================================== */

router.get(
    "/categories",
    asyncHandler(async (req, res) => {

        const data = await Category.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data
        });

    })
);

/* ==================================
   Comments API
================================== */

router.get(
    "/comments/:shayariId",
    asyncHandler(async (req, res) => {

        const data = await Comment.find({
            shayari: req.params.shayariId,
            status: "approved"
        })
            .populate("user", "name")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data
        });

    })
);

/* Add Comment */
router.post(
    "/comments",
    isAuthenticated,
    validateComment,
    asyncHandler(async (req, res) => {

        const comment = await Comment.create({
            shayari: req.body.shayari,
            user: req.user._id,
            message: req.body.message
        });

        res.json({
            success: true,
            data: comment
        });

    })
);

/* ==================================
   Favorites API
================================== */

router.post(
    "/favorite/toggle",
    isAuthenticated,
    asyncHandler(async (req, res) => {

        const { shayariId } = req.body;

        const exists = await Favorite.findOne({
            user: req.user._id,
            shayari: shayariId
        });

        if (exists) {
            await exists.deleteOne();

            return res.json({
                success: true,
                message: "Removed from favorites"
            });
        }

        await Favorite.create({
            user: req.user._id,
            shayari: shayariId
        });

        res.json({
            success: true,
            message: "Added to favorites"
        });

    })
);

/* ==================================
   Download Tracking API
================================== */

router.post(
    "/download",
    optionalAuth,
    asyncHandler(async (req, res) => {

        const {
            shayariId,
            fileName,
            downloadType
        } = req.body;

        await Download.create({
            user: req.user ? req.user._id : null,
            shayari: shayariId,
            fileName,
            downloadType,
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"] || ""
        });

        res.json({
            success: true,
            message: "Download recorded"
        });

    })
);

/* ==================================
   Export
================================== */

module.exports = router;
