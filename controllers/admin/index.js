/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Admin Controller
 * -------------------------------------------------------
 */

"use strict";

const User = require("../../models/User");
const Shayari = require("../../models/Shayari");
const Category = require("../../models/Category");
const Contact = require("../../models/Contact");
const AIImage = require("../../models/AIImage");
const Background = require("../../models/Background");

/* ==================================
   Dashboard
================================== */

exports.dashboard = async (req, res, next) => {

    try {

        const stats = {

            users: await User.countDocuments(),

            shayaries: await Shayari.countDocuments(),

            categories: await Category.countDocuments(),

            contacts: await Contact.countDocuments(),

            aiImages: await AIImage.countDocuments(),

            backgrounds: await Background.countDocuments()

        };

        return res.render("admin/dashboard", {

            title: "Admin Dashboard",

            stats,

            user: req.user

        });

    } catch (error) {

        next(error);

    }

};

/* ==================================
   Users
================================== */

exports.users = async (req, res, next) => {

    try {

        const users = await User.find()
            .sort({ createdAt: -1 });

        return res.render("admin/users/list", {

            title: "Users",

            users

        });

    } catch (error) {

        next(error);

    }

};

/* ==================================
   Shayari
================================== */

exports.shayari = async (req, res, next) => {

    try {

        const list = await Shayari.find()
            .populate("category")
            .populate("author", "name")
            .sort({ createdAt: -1 });

        return res.render("admin/shayari/list", {

            title: "Manage Shayari",

            list

        });

    } catch (error) {

        next(error);

    }

};

/* ==================================
   Categories
================================== */

exports.categories = async (req, res, next) => {

    try {

        const list = await Category.find()
            .sort({ createdAt: -1 });

        return res.render("admin/category/list", {

            title: "Categories",

            list

        });

    } catch (error) {

        next(error);

    }

};

/* ==================================
   Contacts
================================== */

exports.contacts = async (req, res, next) => {

    try {

        const list = await Contact.find()
            .sort({ createdAt: -1 });

        return res.render("admin/contact/list", {

            title: "Contact Messages",

            list

        });

    } catch (error) {

        next(error);

    }

};

/* ==================================
   AI Images
================================== */

exports.aiImages = async (req, res, next) => {

    try {

        const list = await AIImage.find()
            .sort({ createdAt: -1 });

        return res.render("admin/ai/list", {

            title: "AI Images",

            list

        });

    } catch (error) {

        next(error);

    }

};

/* ==================================
   Background Images
================================== */

exports.backgrounds = async (req, res, next) => {

    try {

        const list = await Background.find()
            .sort({ createdAt: -1 });

        return res.render("admin/background/list", {

            title: "Background Images",

            list

        });

    } catch (error) {

        next(error);

    }

};

module.exports = exports;
