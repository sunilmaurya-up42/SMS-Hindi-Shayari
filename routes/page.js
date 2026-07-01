/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Page Routes (Static + Forms)
 * -------------------------------------------------------
 */

"use strict";

const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");

const { optionalAuth } = require("../middleware/auth");
const { validateContact } = require("../middleware/validation");
const { asyncHandler } = require("../utils/helpers");

/* ==================================
   About Page
================================== */

router.get("/about", optionalAuth, (req, res) => {

    res.render("pages/about", {
        title: "About Us",
        user: req.user || null
    });

});

/* ==================================
   Contact Page
================================== */

router.get("/contact", optionalAuth, (req, res) => {

    res.render("pages/contact", {
        title: "Contact Us",
        user: req.user || null
    });

});

/* ==================================
   Submit Contact Form
================================== */

router.post(
    "/contact",
    optionalAuth,
    validateContact,
    asyncHandler(async (req, res) => {

        const { name, email, subject, message } = req.body;

        await Contact.create({
            name,
            email,
            subject,
            message,
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"] || ""
        });

        return res.render("pages/contact", {
            title: "Contact Us",
            user: req.user || null,
            success: "Message sent successfully!"
        });

    })
);

/* ==================================
   Privacy Policy
================================== */

router.get("/privacy-policy", optionalAuth, (req, res) => {

    res.render("pages/privacy", {
        title: "Privacy Policy",
        user: req.user || null
    });

});

/* ==================================
   Terms
================================== */

router.get("/terms", optionalAuth, (req, res) => {

    res.render("pages/terms", {
        title: "Terms & Conditions",
        user: req.user || null
    });

});

/* ==================================
   Disclaimer
================================== */

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
