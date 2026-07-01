import mongoose from "mongoose";

export const connectDatabase = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};
