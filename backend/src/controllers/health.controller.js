export const healthCheck = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "SMS Hindi Shayari API is running.",
    version: "v1",
    environment: process.env.NODE_ENV || "development",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
};
