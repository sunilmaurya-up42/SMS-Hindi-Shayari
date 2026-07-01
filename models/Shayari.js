const mongoose = require("mongoose");

const shayariSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    language: {
      type: String,
      required: true,
      enum: [
        "Hindi",
        "English",
        "Urdu",
        "Punjabi",
        "Marathi",
        "Gujarati",
        "Bengali",
        "Tamil",
        "Telugu",
        "Kannada",
        "Malayalam",
        "Odia"
      ]
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Love",
        "Sad",
        "Friendship",
        "Attitude",
        "Motivational",
        "Good Morning",
        "Good Night",
        "Birthday",
        "Festival",
        "Life",
        "Alone",
        "Romantic",
        "Funny",
        "Bewafa",
        "Dosti",
        "Other"
      ]
    },

    content: {
      type: String,
      required: true,
      trim: true
    },

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true
      }
    ],

    author: {
      type: String,
      default: "Admin",
      trim: true
    },

    featured: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published"
    },

    views: {
      type: Number,
      default: 0
    },

    likes: {
      type: Number,
      default: 0
    },

    metaTitle: {
      type: String,
      trim: true,
      maxlength: 70
    },

    metaDescription: {
      type: String,
      trim: true,
      maxlength: 170
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Shayari", shayariSchema);
