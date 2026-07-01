/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Page Routes
 * -------------------------------------------------------
 */

"use strict";

const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");
const pageController = require("../controllers/page");

const { optionalAuth } = require("../middleware/auth");
const { validateContact } = require("../middleware/validation");
const { asyncHandler } = require("../utils/helpers");

/* ==================================
   About
================================== */

router.get(
    "/about",
    optionalAuth,
    pageController.about
);

/* ==================================
   Contact
================================== */

router.get(
    "/contact",
    optionalAuth,
    pageController.contact
);

/* ==================================
   Contact Form
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

router.get(
    "/privacy-policy",
    optionalAuth,
    pageController.privacyPolicy
);

/* ==================================
   Terms
================================== */

router.get(
    "/terms",
    optionalAuth,
    pageController.terms
);

/* ==================================
   Disclaimer
================================== */

router.get(
    "/disclaimer",
    optionalAuth,
    pageController.disclaimer
);

/* ==================================
   Export
================================== */

module.exports = router;
