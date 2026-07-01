/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Slug Utility
 * -------------------------------------------------------
 */

"use strict";

const slugify = require("slugify");

/* ==================================
   Generate Slug
================================== */

const createSlug = (text = "") => {

    return slugify(String(text), {
        lower: true,
        strict: true,
        trim: true
    });

};

/* ==================================
   Generate Unique Slug
================================== */

const createUniqueSlug = async (
    Model,
    text,
    currentId = null
) => {

    const baseSlug = createSlug(text);

    let slug = baseSlug;

    let counter = 1;

    while (true) {

        const query = { slug };

        if (currentId) {
            query._id = { $ne: currentId };
        }

        const exists = await Model.exists(query);

        if (!exists) {
            return slug;
        }

        counter += 1;

        slug = `${baseSlug}-${counter}`;

    }

};

/* ==================================
   Export
================================== */

module.exports = {
    createSlug,
    createUniqueSlug
};
