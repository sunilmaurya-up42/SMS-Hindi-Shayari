/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Global Error Handler
 * -------------------------------------------------------
 */

"use strict";

const mongoose = require("mongoose");
const multer = require("multer");

module.exports = (err, req, res, next) => {

    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    /* ==================================
       MongoDB Cast Error
    ================================== */

    if (err instanceof mongoose.Error.CastError) {
        statusCode = 400;
        message = "Invalid resource id.";
    }

    /* ==================================
       MongoDB Validation Error
    ================================== */

    if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = Object.values(err.errors)
            .map(item => item.message)
            .join(", ");
    }

    /* ==================================
       Duplicate Key Error
    ================================== */

    if (err.code === 11000) {
        statusCode = 409;

        const field = Object.keys(err.keyValue)[0];

        message = `${field} already exists.`;
    }

    /* ==================================
       Multer Error
    ================================== */

    if (err instanceof multer.MulterError) {
        statusCode = 400;
        message = err.message;
    }

    /* ==================================
       JWT (Future Ready)
    ================================== */

    if (
        err.name === "JsonWebTokenError" ||
        err.name === "TokenExpiredError"
    ) {
        statusCode = 401;
        message = "Invalid or expired token.";
    }

    /* ==================================
       API Response
    ================================== */

    if (req.originalUrl.startsWith("/api")) {

        return res.status(statusCode).json({
            success: false,
            statusCode,
            message,
            ...(process.env.NODE_ENV === "development" && {
                stack: err.stack
            })
        });

    }

    /* ==================================
       Website Response
    ================================== */

    return res.status(statusCode).render("errors/500", {
        title: `${statusCode} Error`,
        statusCode,
        message,
        error:
            process.env.NODE_ENV === "development"
                ? err
                : null
    });

};
