/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Contact Model
 * -------------------------------------------------------
 */

"use strict";

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 255,
            index: true
        },

        subject: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },

        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000
        },

        status: {
            type: String,
            enum: [
                "new",
                "read",
                "replied",
                "closed"
            ],
            default: "new",
            index: true
        },

        adminReply: {
            type: String,
            default: "",
            maxlength: 5000
        },

        repliedAt: {
            type: Date,
            default: null
        },

        repliedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        ipAddress: {
            type: String,
            default: ""
        },

        userAgent: {
            type: String,
            default: ""
        },

        isSpam: {
            type: Boolean,
            default: false,
            index: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

/* ==================================
   Indexes
================================== */

contactSchema.index({
    status: 1,
    createdAt: -1
});

contactSchema.index({
    email: 1,
    createdAt: -1
});

/* ==================================
   Instance Methods
================================== */

contactSchema.methods.markAsRead = function () {
    this.status = "read";
    return this.save({
        validateBeforeSave: false
    });
};

contactSchema.methods.reply = function (reply, adminId) {

    this.adminReply = reply;
    this.status = "replied";
    this.repliedAt = new Date();
    this.repliedBy = adminId;

    return this.save();
};

contactSchema.methods.close = function () {

    this.status = "closed";

    return this.save({
        validateBeforeSave: false
    });
};

/* ==================================
   Export
================================== */

module.exports = mongoose.model(
    "Contact",
    contactSchema
);
