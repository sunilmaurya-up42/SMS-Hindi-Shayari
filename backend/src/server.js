import http from "http";

import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./database/connectDatabase.js";
import logger from "./config/logger.js";

const startServer = async () => {
  try {
    if (!env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing.");
    }

    await connectDatabase(env.MONGODB_URI);

    const server = http.createServer(app);

    server.listen(env.PORT, () => {
      logger.info(
        `Server Running on Port ${env.PORT} (${env.NODE_ENV})`
      );
    });

  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

startServer();
