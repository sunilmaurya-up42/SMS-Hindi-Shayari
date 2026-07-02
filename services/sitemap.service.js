/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Sitemap Service
 * -------------------------------------------------------
 */

"use strict";

const Shayari = require("../models/Shayari");
const Category = require("../models/Category");
const AIImage = require("../models/AIImage");
const Background = require("../models/Background");

const SITE_URL =
    process.env.SITE_URL ||
    "https://sms-hindi-shayari.onrender.com";

/* ==================================
   XML Header
================================== */

const xmlHeader = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

/* ==================================
   XML Footer
================================== */

const xmlFooter = () => "</urlset>";

/* ==================================
   Create URL Node
================================== */

const createUrl = (

    loc,

    lastmod = new Date(),

    changefreq = "weekly",

    priority = "0.8"

) => {

    return `
<url>
    <loc>${loc}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
</url>`;

};

/* ==================================
   Static Pages
================================== */

const staticPages = [

    {
        path: "",
        priority: "1.0"
    },

    {
        path: "/about",
        priority: "0.8"
    },

    {
        path: "/contact",
        priority: "0.8"
    },

    {
        path: "/privacy",
        priority: "0.5"
    },

    {
        path: "/terms",
        priority: "0.5"
    },

    {
        path: "/disclaimer",
        priority: "0.5"
    },

    {
        path: "/search",
        priority: "0.7"
    }

];

/* ==================================
   Generate Dynamic Sitemap
================================== */

const generateDynamicUrls = async () => {

    const urls = [];

    /* Categories */

    const categories = await Category.find({
        isActive: true
    }).select("slug updatedAt");

    categories.forEach((category) => {

        urls.push(

            createUrl(

                `${SITE_URL}/category/${category.slug}`,

                category.updatedAt,

                "weekly",

                "0.9"

            )

        );

    });

    /* Shayari */

    const shayaries = await Shayari.find({
        isPublished: true
    }).select("slug updatedAt");

    shayaries.forEach((shayari) => {

        urls.push(

            createUrl(

                `${SITE_URL}/shayari/${shayari.slug}`,

                shayari.updatedAt,

                "daily",

                "0.9"

            )

        );

    });

    /* AI Images */

    const aiImages = await AIImage.find({
        isActive: true
    }).select("slug updatedAt");

    aiImages.forEach((image) => {

        urls.push(

            createUrl(

                `${SITE_URL}/ai-image/${image.slug}`,

                image.updatedAt,

                "weekly",

                "0.7"

            )

        );

    });

    /* Background Images */

    const backgrounds = await Background.find({
        isActive: true
    }).select("slug updatedAt");

    backgrounds.forEach((background) => {

        urls.push(

            createUrl(

                `${SITE_URL}/background/${background.slug}`,

                background.updatedAt,

                "weekly",

                "0.7"

            )

        );

    });

    return urls;

};

/* ==================================
   Generate Sitemap XML
================================== */

const generateSitemap = async () => {

    const sitemap = [];

    sitemap.push(xmlHeader());

    /* Static Pages */

    staticPages.forEach((page) => {

        sitemap.push(

            createUrl(

                `${SITE_URL}${page.path}`,

                new Date(),

                "weekly",

                page.priority

            )

        );

    });

    /* Dynamic Pages */

    const dynamicUrls = await generateDynamicUrls();

    sitemap.push(...dynamicUrls);

    sitemap.push(xmlFooter());

    return sitemap.join("\n");

};

/* ==================================
   Export
================================== */

module.exports = {

    xmlHeader,

    xmlFooter,

    createUrl,

    staticPages,

    generateDynamicUrls,

    generateSitemap

};
