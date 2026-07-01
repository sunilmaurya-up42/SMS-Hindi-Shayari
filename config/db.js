/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * MongoDB Configuration
 * -------------------------------------------------------
 */

"use strict";

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDatabase = async () => {
    try {

        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing in environment variables.");
        }

        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            autoIndex: false,
            maxPoolSize: 10,
            minPoolSize: 2,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000
        });

        console.log("==================================");
        console.log(" MongoDB Connected");
        console.log(` Database : ${connection.connection.name}`);
        console.log(` Host     : ${connection.connection.host}`);
        console.log("==================================");

        return connection;

    } catch (error) {

        console.error("==================================");
        console.error(" MongoDB Connection Failed");
        console.error(error.message);
        console.error("==================================");

        process.exit(1);
    }
};

/* ===============================
   Connection Events
=============================== */

mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established.");
});

mongoose.connection.on("error", (error) => {
    console.error("MongoDB Error:", error.message);
});

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected.");
});

module.exports = connectDatabase;
