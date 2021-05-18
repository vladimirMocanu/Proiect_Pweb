const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const createError = require("http-errors");
const mongoose = require("mongoose");
const routes = require("./WebApp/Controllers");
//const ServerError = require("./WebApp/Models/ServerError.js");
const rateLimit = require("express-rate-limit");
require("express-async-errors");
require("log-timestamp");
require("dotenv/config");

app.use(helmet());
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'
  )
);

// app.use((err, req, res, next) => {
//   if (err) {
//     console.error(err);
//     let status = 500;
//     let message = "Something Bad Happened";
//     if (err instanceof ServerError) {
//       message = err.Message;
//       status = err.StatusCode;
//     }
//     return next(createError(status, message));
//   }
// });

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connect to DB")
);

//Parser json
app.use(express.json());

//Import routes
app.use("/api", routes);

//Define rate limit
const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 60 * 1000, // 1 min in milliseconds
  max: 100, //max 100 requests
  message: "You have exceeded the 100 requests in 1 min limit!",
  headers: true,
});

//Use ratelimit
app.use(rateLimiterUsingThirdParty);

//Listening
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});

// Create a function to terminate your app gracefully:
function gracefulShutdown() {
  // First argument is [force], see mongoose doc.
  mongoose.connection.close(false, () => {
    console.log("MongoDb connection closed.");
  });
}

// Ask node to run your function before exit:

// This will handle process.exit():
process.on("exit", gracefulShutdown);
process.on("restart", gracefulShutdown);

// This will handle kill commands, such as CTRL+C:
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("SIGKILL", gracefulShutdown);

// This will prevent dirty exit on code-fault crashes:
//process.on("uncaughtException", gracefulShutdown);
