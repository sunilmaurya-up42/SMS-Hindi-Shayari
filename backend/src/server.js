import http from "http";
import app from "./app.js";
import { env } from "./config/env.js";

const server = http.createServer(app);

server.listen(env.PORT, () => {
  console.log(`
=========================================
 SMS Hindi Shayari API
=========================================
 Environment : ${env.NODE_ENV}
 Port        : ${env.PORT}
=========================================
`);
});

process.on("SIGINT", () => {
  console.log("Server Stopped");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Server Terminated");
  process.exit(0);
});
