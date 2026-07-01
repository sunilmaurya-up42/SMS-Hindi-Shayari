/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * AI Image Model
 * -------------------------------------------------------
 */

"use strict";

const mongoose = require("mongoose");

const aiImageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },

        prompt: {
            type: String,
            default: "",
            trim: true,
            maxlength: 5000
        },

        style: {
            type: String,
            default: "realistic",
            enum: [
                "realistic",
                "3d",
                "anime",
                "watercolor",
                "digital-art",
                "minimal",
                "cartoon"
            ],
            index: true
        },

        fileName: {
            type: String,
            required: true
        },

        filePath: {
            type: String,
            required: true
        },

        githubUrl: {
            type: String,
            required: true
        },

        rawUrl: {
            type: String,
            required: true
        },

        width: {
            type: Number,
            default: 1024
        },

        height: {
            type: Number,
            default: 1024
        },

        fileSize: {
            type: Number,
            default: 0
        },

        mimeType: {
            type: String,
            default: "image/png"
        },

        background: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Background",
            default: null,
            index: true
        },

        alt: {
            type: String,
            default: ""
        },

        seoTitle: {
            type: String,
            default: ""
        },

        seoDescription: {
            type: String,
            default: ""
        },

        tags: [{
            type: String,
            trim: true,
            lowercase: true
        }],

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        usageCount: {
            type: Number,
            default: 0
        },

        isFeatured: {
            type: Boolean,
            default: false,
            index: true
        },

        isActive: {
            type: Boolean,
            default: true,
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

aiImageSchema.index({
    slug: 1
});

aiImageSchema.index({
    style: 1,
    isActive: 1
});

aiImageSchema.index({
    background: 1
});

/* ==================================
   Instance Methods
================================== */

aiImageSchema.methods.incrementUsage = function () {

    this.usageCount += 1;

    return this.save({
        validateBeforeSave: false
    });

};

/* ==================================
   Static Methods
================================== */

aiImageSchema.statics.getFeatured = function () {

    return this.find({
        isFeatured: true,
        isActive: true
    }).sort({
        createdAt: -1
    });

};

/* ==================================
   Export
================================== */

module.exports = mongoose.model(
    "AIImage",
    aiImageSchema
);
