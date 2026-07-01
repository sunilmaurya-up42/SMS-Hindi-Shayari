const express = require("express");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

// Render ke liye PORT
const PORT = process.env.PORT || 3000;

// Security
app.use(helmet());

// Compression
app.use(compression());

// Logger
app.use(morgan("dev"));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change_this_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home Route
app.get("/", (req, res) => {
  res.send("✅ Multilingual Shayari Website Server Running...");
});

// 404 Route
app.use((req, res) => {
  res.status(404).send("404 | Page Not Found");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
