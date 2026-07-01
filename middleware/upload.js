/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Upload Middleware
 * -------------------------------------------------------
 */

"use strict";

const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

/* ==================================
   Storage
================================== */

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, uploadDir);
    },

    filename(req, file, cb) {

        const extension = path.extname(file.originalname).toLowerCase();

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            extension;

        cb(null, uniqueName);

    }

});

/* ==================================
   File Filter
================================== */

const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
];

const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
];

function fileFilter(req, file, cb) {

    const extension = path
        .extname(file.originalname)
        .toLowerCase();

    if (
        allowedMimeTypes.includes(file.mimetype) &&
        allowedExtensions.includes(extension)
    ) {
        return cb(null, true);
    }

    return cb(
        new Error(
            "Only JPG, JPEG, PNG and WEBP images are allowed."
        ),
        false
    );

}

/* ==================================
   Upload Instance
================================== */

const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1
    }

});

/* ==================================
   Error Handler
================================== */

const handleUploadError = (err, req, res, next) => {

    if (err instanceof multer.MulterError) {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }

    if (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }

    next();

};

/* ==================================
   Export
================================== */

module.exports = {
    upload,
    handleUploadError
};
