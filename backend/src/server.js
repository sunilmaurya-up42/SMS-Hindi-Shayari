import http from "http";

import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./database/connectDatabase.js";

const startServer = async () => {
  try {
    if (env.MONGODB_URI) {
      await connectDatabase(env.MONGODB_URI);
    } else {
      console.warn("⚠️ MONGODB_URI not configured. Starting without database.");
    }

    const server = http.createServer(app);

    server.listen(env.PORT, () => {
      console.log(`
=========================================
🚀 SMS Hindi Shayari API
=========================================
Environment : ${env.NODE_ENV}
Port        : ${env.PORT}
=========================================
      `);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
