import mongoose from "mongoose";
import ApiResponse from "../utils/ApiResponse.js";

export const healthCheck = (req, res) => {
  const database =
    mongoose.connection.readyState === 1
      ? "Connected"
      : "Disconnected";

  return res.status(200).json(
    new ApiResponse(200, "SMS Hindi Shayari API is running.", {
      version: "v1",
      environment: process.env.NODE_ENV,
      database,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    })
  );
};
