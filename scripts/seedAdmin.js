/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Seed Default Admin
 * -------------------------------------------------------
 */

"use strict";

require("dotenv").config();

const bcrypt = require("bcryptjs");

const connectDB = require("../config/database");

const User = require("../models/User");

/* ==================================
   Seed Admin
================================== */

const seedAdmin = async () => {

    try {

        await connectDB();

        const existingAdmin = await User.findOne({

            role: "admin"

        });

        if (existingAdmin) {

            console.log(

                "Admin account already exists."

            );

            process.exit(0);

        }

        const password = await bcrypt.hash(

            process.env.ADMIN_PASSWORD,

            12

        );

        await User.create({

            name:
                process.env.ADMIN_NAME,

            username:
                process.env.ADMIN_USERNAME,

            email:
                process.env.ADMIN_EMAIL,

            password,

            role: "admin",

            isVerified: true,

            isActive: true

        });

          console.log("");

        console.log("==================================");
        console.log(" Default Admin Created");
        console.log("==================================");
        console.log(` Name     : ${process.env.ADMIN_NAME}`);
        console.log(` Username : ${process.env.ADMIN_USERNAME}`);
        console.log(` Email    : ${process.env.ADMIN_EMAIL}`);
        console.log(" Role     : admin");
        console.log("==================================");

        process.exit(0);

    } catch (error) {

        console.error("");

        console.error("==================================");
        console.error(" Failed To Seed Admin");
        console.error("==================================");
        console.error(error.message);
        console.error("==================================");

        process.exit(1);

    }

};

/* ==================================
   Execute Script
================================== */

seedAdmin();
