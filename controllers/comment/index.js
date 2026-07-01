/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Comment Controller
 * -------------------------------------------------------
 */

"use strict";

const Comment = require("../../models/Comment");
const Shayari = require("../../models/Shayari");

/* ==================================
   List Comments
================================== */

exports.list = async (req, res, next) => {

    try {

        const comments = await Comment.find({
            shayari: req.params.shayariId,
            status: "approved"
        })
        .populate("user", "name")
        .sort({ createdAt: -1 });

        return res.json({
            success: true,
            data: comments
        });

    } catch (error) {

        next(error);

    }

};

/* ==================================
   Create Comment
================================== */

exports.create = async (req, res, next) => {

    try {

        const { shayari, message } = req.body;

        const post = await Shayari.findById(shayari);

        if (!post) {

            return res.status(404).json({
                success: false,
                message: "Shayari not found."
            });

        }

        const comment = await Comment.create({

            shayari,

            user: req.user._id,

            message

        });

        return res.status(201).json({

            success: true,

            message: "Comment added successfully.",

            data: comment

        });

    } catch (error) {

        next(error);

    }

};

/* ==================================
   Update Comment
================================== */

exports.update = async (req, res, next) => {

    try {

        const comment = await Comment.findById(req.params.id);

        if (!comment) {

            return res.status(404).json({
                success: false,
                message: "Comment not found."
            });

        }

        if (comment.user.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                success: false,
                message: "Permission denied."
            });

        }

        comment.message = req.body.message || comment.message;

        await comment.save();

        return res.json({

            success: true,

            message: "Comment updated.",

            data: comment

        });

    } catch (error) {

        next(error);

    }

};

/* ==================================
   Delete Comment
================================== */

exports.remove = async (req, res, next) => {

    try {

        const comment = await Comment.findById(req.params.id);

        if (!comment) {

            return res.status(404).json({
                success: false,
                message: "Comment not found."
            });

        }

        if (comment.user.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                success: false,
                message: "Permission denied."
            });

        }

        await comment.deleteOne();

        return res.json({

            success: true,

            message: "Comment deleted successfully."

        });

    } catch (error) {

        next(error);

    }

};

module.exports = exports;
