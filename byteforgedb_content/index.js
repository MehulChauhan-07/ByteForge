const express = require("express");
const path = require("path");
const URL = require("./models/url_Schema");
const { connectToMongoDB } = require("./mongo_config");
const urlRouter = require("./routes/url");
const testRouter = require("./routes/test");
const staticRoute = require("./routes/staticRoute");
const cors = require("cors");

//! middleware for the url router which is store in to log file
const { logRequest } = require("./midddelware/logfile");

const app = express();
const port = 3001;

connectToMongoDB("mongodb://localhost:27017/url_shortener");

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Your React app's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(logRequest("log.txt"));
app.use((req, res, next) => {
  console.log(`${req.method} request to http://localhost:${port}${req.url}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// view engine setup
app.set("view engine", "ejs").set("views", path.resolve("./views"));

//routes
app.use("/", staticRoute);
app.use("/url", urlRouter);
// ? for the testing purpose
app.use("/test", testRouter);

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
