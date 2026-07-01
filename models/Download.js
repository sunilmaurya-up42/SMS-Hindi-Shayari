/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Download Model
 * -------------------------------------------------------
 */

"use strict";

const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
            index: true
        },

        shayari: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shayari",
            required: true,
            index: true
        },

        background: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Background",
            default: null,
            index: true
        },

        aiImage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AIImage",
            default: null,
            index: true
        },

        fileName: {
            type: String,
            required: true,
            trim: true
        },

        filePath: {
            type: String,
            default: ""
        },

        downloadType: {
            type: String,
            enum: [
                "png",
                "jpg",
                "jpeg",
                "webp"
            ],
            default: "png",
            index: true
        },

        imageWidth: {
            type: Number,
            default: 1080
        },

        imageHeight: {
            type: Number,
            default: 1080
        },

        ipAddress: {
            type: String,
            default: ""
        },

        userAgent: {
            type: String,
            default: ""
        },

        browser: {
            type: String,
            default: ""
        },

        operatingSystem: {
            type: String,
            default: ""
        },

        deviceType: {
            type: String,
            enum: [
                "desktop",
                "mobile",
                "tablet",
                "unknown"
            ],
            default: "unknown"
        },

        country: {
            type: String,
            default: ""
        },

        state: {
            type: String,
            default: ""
        },

        city: {
            type: String,
            default: ""
        },

        downloadStatus: {
            type: String,
            enum: [
                "success",
                "failed"
            ],
            default: "success",
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

downloadSchema.index({
    createdAt: -1
});

downloadSchema.index({
    user: 1,
    createdAt: -1
});

downloadSchema.index({
    shayari: 1,
    createdAt: -1
});

downloadSchema.index({
    downloadType: 1
});

downloadSchema.index({
    downloadStatus: 1
});

/* ==================================
   Static Methods
================================== */

downloadSchema.statics.getLatest = function (limit = 50) {

    return this.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("user", "name email")
        .populate("shayari", "title slug");

};

downloadSchema.statics.getTotalDownloads = function () {

    return this.countDocuments({
        downloadStatus: "success"
    });

};

/* ==================================
   Export
================================== */

module.exports = mongoose.model(
    "Download",
    downloadSchema
);
