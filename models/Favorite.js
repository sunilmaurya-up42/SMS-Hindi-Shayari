/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Favorite Model
 * -------------------------------------------------------
 */

"use strict";

const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        shayari: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shayari",
            required: true,
            index: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

/* ==================================
   Prevent Duplicate Favorites
================================== */

favoriteSchema.index(
    {
        user: 1,
        shayari: 1
    },
    {
        unique: true
    }
);

/* ==================================
   Static Methods
================================== */

favoriteSchema.statics.isFavorite = async function (
    userId,
    shayariId
) {
    return this.exists({
        user: userId,
        shayari: shayariId
    });
};

favoriteSchema.statics.addFavorite = async function (
    userId,
    shayariId
) {
    return this.create({
        user: userId,
        shayari: shayariId
    });
};

favoriteSchema.statics.removeFavorite = async function (
    userId,
    shayariId
) {
    return this.findOneAndDelete({
        user: userId,
        shayari: shayariId
    });
};

favoriteSchema.statics.getUserFavorites = function (
    userId
) {
    return this.find({
        user: userId
    })
        .populate({
            path: "shayari",
            populate: [
                {
                    path: "category",
                    select: "name slug"
                },
                {
                    path: "author",
                    select: "name"
                }
            ]
        })
        .sort({
            createdAt: -1
        });
};

/* ==================================
   Export
================================== */

module.exports = mongoose.model(
    "Favorite",
    favoriteSchema
);
