/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * 404 Not Found Middleware
 * -------------------------------------------------------
 */

"use strict";

module.exports = (req, res) => {

    const statusCode = 404;

    if (req.originalUrl.startsWith("/api")) {

        return res.status(statusCode).json({
            success: false,
            statusCode,
            error: "Not Found",
            message: "The requested API endpoint does not exist."
        });

    }

    return res.status(statusCode).render("errors/404", {
        title: "404 - Page Not Found",
        statusCode,
        url: req.originalUrl
    });

};
