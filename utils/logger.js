/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Logger Utility
 * -------------------------------------------------------
 */

"use strict";

const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(process.cwd(), "logs");

/* ==================================
   Ensure Log Directory
================================== */

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

/* ==================================
   Log File Paths
================================== */

const getLogFile = () => {

    const date = new Date().toISOString().split("T")[0];

    return path.join(LOG_DIR, `${date}.log`);

};

/* ==================================
   Write Log
================================== */

const writeLog = (level, message) => {

    const timestamp = new Date().toISOString();

    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

    fs.appendFileSync(getLogFile(), logMessage, "utf8");

};

/* ==================================
   Logger Methods
================================== */

const logger = {

    info: (message) => {
        console.log(message);
        writeLog("info", message);
    },

    warn: (message) => {
        console.warn(message);
        writeLog("warn", message);
    },

    error: (message) => {
        console.error(message);
        writeLog("error", message);
    },

    debug: (message) => {

        if (process.env.NODE_ENV !== "production") {
            console.log(message);
            writeLog("debug", message);
        }

    }

};

/* ==================================
   Request Logger Middleware
================================== */

const requestLogger = (req, res, next) => {

    const start = Date.now();

    res.on("finish", () => {

        const duration = Date.now() - start;

        const log = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

        logger.info(log);

    });

    next();

};

/* ==================================
   Export
================================== */

module.exports = {
    logger,
    requestLogger
};
