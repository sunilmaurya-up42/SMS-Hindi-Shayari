/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * User Routes
 * -------------------------------------------------------
 */

"use strict";

const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

const {
    isAuthenticated
} = require("../middleware/auth");

/* ==================================
   Dashboard
================================== */

router.get(
    "/dashboard",
    isAuthenticated,
    userController.dashboard
);

/* ==================================
   Profile
================================== */

router.get(
    "/profile",
    isAuthenticated,
    userController.profile
);

/* ==================================
   Update Profile
================================== */

router.post(
    "/profile",
    isAuthenticated,
    userController.updateProfile
);

/* ==================================
   My Favorites
================================== */

router.get(
    "/favorites",
    isAuthenticated,
    userController.favorites
);

/* ==================================
   My Downloads
================================== */

router.get(
    "/downloads",
    isAuthenticated,
    userController.downloads
);

/* ==================================
   Change Password
================================== */

router.post(
    "/change-password",
    isAuthenticated,
    userController.changePassword
);

/* ==================================
   Delete Account
================================== */

router.post(
    "/delete-account",
    isAuthenticated,
    userController.deleteAccount
);

/* ==================================
   Export
================================== */

module.exports = router;
