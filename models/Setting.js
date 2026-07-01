/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Website Settings Model
 * -------------------------------------------------------
 */

"use strict";

const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
    {
        websiteName: {
            type: String,
            default: "SMS Hindi Shayari",
            trim: true,
            maxlength: 100
        },

        websiteUrl: {
            type: String,
            default: ""
        },

        tagline: {
            type: String,
            default: ""
        },

        logo: {
            type: String,
            default: ""
        },

        favicon: {
            type: String,
            default: ""
        },

        defaultLanguage: {
            type: String,
            default: "Hindi"
        },

        supportedLanguages: [{
            type: String
        }],

        contactEmail: {
            type: String,
            default: ""
        },

        contactPhone: {
            type: String,
            default: ""
        },

        contactAddress: {
            type: String,
            default: ""
        },

        facebook: {
            type: String,
            default: ""
        },

        instagram: {
            type: String,
            default: ""
        },

        youtube: {
            type: String,
            default: ""
        },

        x: {
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

        seoKeywords: [{
            type: String
        }],

        googleAnalyticsId: {
            type: String,
            default: ""
        },

        googleSiteVerification: {
            type: String,
            default: ""
        },

        adsensePublisherId: {
            type: String,
            default: ""
        },

        adsTxt: {
            type: String,
            default: ""
        },

        maintenanceMode: {
            type: Boolean,
            default: false
        },

        allowRegistration: {
            type: Boolean,
            default: true
        },

        allowComments: {
            type: Boolean,
            default: true
        },

        allowImageDownload: {
            type: Boolean,
            default: true
        },

        pwaEnabled: {
            type: Boolean,
            default: true
        },

        copyright: {
            type: String,
            default: "© SMS Hindi Shayari"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

/* ==================================
   Singleton
================================== */

settingSchema.index({}, { unique: true });

/* ==================================
   Static Methods
================================== */

settingSchema.statics.getSettings = async function () {

    let settings = await this.findOne();

    if (!settings) {

        settings = await this.create({
            supportedLanguages: [
                "Hindi",
                "English",
                "Urdu"
            ]
        });

    }

    return settings;

};

/* ==================================
   Export
================================== */

module.exports = mongoose.model(
    "Setting",
    settingSchema
);
