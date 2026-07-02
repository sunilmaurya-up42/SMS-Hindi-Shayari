/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * Analytics Service
 * -------------------------------------------------------
 */

"use strict";

const Shayari = require("../models/Shayari");
const Category = require("../models/Category");
const User = require("../models/User");
const Download = require("../models/Download");
const AIImage = require("../models/AIImage");
const Background = require("../models/Background");

/* ==================================
   Dashboard Statistics
================================== */

const getDashboardStats = async () => {

    const [

        totalUsers,

        totalShayari,

        totalCategories,

        totalDownloads,

        totalAIImages,

        totalBackgrounds

    ] = await Promise.all([

        User.countDocuments(),

        Shayari.countDocuments(),

        Category.countDocuments(),

        Download.countDocuments(),

        AIImage.countDocuments(),

        Background.countDocuments()

    ]);

    return {

        totalUsers,

        totalShayari,

        totalCategories,

        totalDownloads,

        totalAIImages,

        totalBackgrounds

    };

};

/* ==================================
   Popular Shayari
================================== */

const getPopularShayari = async (

    limit = 10

) => {

    return Shayari.find({

        isPublished: true

    })

    .select(

        "title slug views likes"

    )

    .sort({

        views: -1,

        likes: -1

    })

    .limit(limit);

};

/* ==================================
   Recent Users
================================== */

const getRecentUsers = async (

    limit = 10

) => {

    return User.find()

        .select(

            "name username email createdAt"

        )

        .sort({

            createdAt: -1

        })

        .limit(limit);

};

/* ==================================
   Category Statistics
================================== */

const getCategoryStats = async () => {

    return Category.aggregate([

        {
            $lookup: {
                from: "shayaris",
                localField: "_id",
                foreignField: "category",
                as: "shayari"
            }
        },

        {
            $project: {

                name: 1,

                slug: 1,

                totalShayari: {
                    $size: "$shayari"
                }

            }
        },

        {
            $sort: {

                totalShayari: -1

            }
        }

    ]);

};

/* ==================================
   Download Statistics
================================== */

const getDownloadStats = async () => {

    return Download.aggregate([

        {

            $group: {

                _id: "$downloadType",

                total: {

                    $sum: 1

                }

            }

        },

        {

            $sort: {

                total: -1

            }

        }

    ]);

};

/* ==================================
   Top Backgrounds
================================== */

const getTopBackgrounds = async (

    limit = 10

) => {

    return Background.find({

        isActive: true

    })

    .select(

        "title slug usageCount"

    )

    .sort({

        usageCount: -1

    })

    .limit(limit);

};

/* ==================================
   Top AI Images
================================== */

const getTopAIImages = async (

    limit = 10

) => {

    return AIImage.find({

        isActive: true

    })

    .select(

        "title slug usageCount"

    )

    .sort({

        usageCount: -1

    })

    .limit(limit);

};

/* ==================================
   Monthly Statistics
================================== */

const getMonthlyStats = async () => {

    return User.aggregate([

        {
            $group: {

                _id: {

                    year: {
                        $year: "$createdAt"
                    },

                    month: {
                        $month: "$createdAt"
                    }

                },

                totalUsers: {

                    $sum: 1

                }

            }

        },

        {
            $sort: {

                "_id.year": 1,

                "_id.month": 1

            }

        }

    ]);

};

/* ==================================
   Export
================================== */

module.exports = {

    getDashboardStats,

    getPopularShayari,

    getRecentUsers,

    getCategoryStats,

    getDownloadStats,

    getTopBackgrounds,

    getTopAIImages,

    getMonthlyStats

};
