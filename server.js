/**
 * ---------------------------------------------------------
 * SMS Hindi Shayari
 * Production Server Entry
 * ---------------------------------------------------------
 */

require("dotenv").config();

const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const connectDatabase = require("./config/db");

// Handle Uncaught Exceptions
process.on("uncaughtException", (error) => {
    console.error("UNCAUGHT EXCEPTION");
    console.error(error);

    process.exit(1);
});

const PORT = process.env.PORT || 3000;

(async () => {
    try {

        // Connect MongoDB
        await connectDatabase();

        // Create HTTP Server
        const server = http.createServer(app);

        // Start Server
        server.listen(PORT, () => {
            console.log("==================================");
            console.log(" SMS Hindi Shayari");
            console.log(" Production Server Started");
            console.log(` Port : ${PORT}`);
            console.log(` Environment : ${process.env.NODE_ENV || "development"}`);
            console.log("==================================");
        });

        // MongoDB Connection Events
        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB Disconnected");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("MongoDB Reconnected");
        });

        // Unhandled Promise Rejection
        process.on("unhandledRejection", (error) => {
            console.error("UNHANDLED PROMISE REJECTION");
            console.error(error);

            server.close(() => {
                process.exit(1);
            });
        });

        // Graceful Shutdown
        process.on("SIGINT", async () => {
            console.log("\nStopping Server...");

            await mongoose.connection.close();

            process.exit(0);
        });

    } catch (error) {

        console.error("SERVER START FAILED");
        console.error(error);

        process.exit(1);

    }
})();
