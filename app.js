/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Production Express Application
 * -------------------------------------------------------
 */

"use strict";

/* ===============================
   Core Modules
================================ */

const path = require("path");

/* ===============================
   Third Party Packages
================================ */

const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

/* ===============================
   Express App
================================ */

const app = express();

/* ===============================
   App Settings
================================ */

app.set("env", process.env.NODE_ENV || "development");

app.set("port", process.env.PORT || 3000);

app.set("trust proxy", 1);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.disable("x-powered-by");

/* ===============================
   Security
================================ */

app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false
    })
);

/* ===============================
   Compression
================================ */

app.use(compression());

/* ===============================
   CORS
================================ */

app.use(
    cors({
        origin: true,
        credentials: true
    })
);

/* ===============================
   Logger
================================ */

if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
}

/* ===============================
   Request Parser
================================ */

app.use(express.json({ limit: "10mb" }));

app.use(
    express.urlencoded({
        extended: true,
        limit: "10mb"
    })
);

app.use(cookieParser());

/* ===============================
   Static Files
================================ */

app.use(express.static(path.join(__dirname, "public")));

/* ===============================
   Session Configuration
================================ */

app.use(
    session({
        name: "sms_hindi_shayari.sid",
        secret: process.env.SESSION_SECRET,

        resave: false,
        saveUninitialized: false,

        rolling: true,

        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            ttl: 60 * 60 * 24 * 30
        }),

        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 30
        }
    })
);

/* ===============================
   Global Variables
================================ */

app.use((req, res, next) => {

    res.locals.appName = "SMS Hindi Shayari";

    res.locals.currentUrl = req.originalUrl;

    res.locals.user = req.session.user || null;

    res.locals.isLoggedIn = !!req.session.user;

    res.locals.year = new Date().getFullYear();

    next();

});

/* ===============================
   Routes
================================ */

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const shayariRoutes = require("./routes/shayari");
const commentRoutes = require("./routes/comment");
const userRoutes = require("./routes/user");
const pageRoutes = require("./routes/page");
const apiRoutes = require("./routes/api");

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/shayari", shayariRoutes);
app.use("/comment", commentRoutes);
app.use("/user", userRoutes);
app.use("/", pageRoutes);
app.use("/api", apiRoutes);

/* ===============================
   404 Handler
================================ */

app.use((req, res) => {

    if (req.accepts("html")) {
        return res.status(404).render("errors/404", {
            title: "404 - Page Not Found"
        });
    }

    if (req.accepts("json")) {
        return res.status(404).json({
            success: false,
            message: "Page Not Found"
        });
    }

    return res.status(404).type("txt").send("Page Not Found");

});

/* ===============================
   Global Error Handler
================================ */

app.use((err, req, res, next) => {

    console.error(err);

    const statusCode = err.status || 500;

    if (req.accepts("html")) {
        return res.status(statusCode).render("errors/500", {
            title: "Server Error",
            error:
                process.env.NODE_ENV === "development"
                    ? err
                    : null
        });
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

});

/* ===============================
   Export App
================================ */

module.exports = app;
