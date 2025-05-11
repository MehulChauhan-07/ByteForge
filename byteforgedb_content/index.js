const express = require("express");
const path = require("path");
const URL = require("./models/url_Schema");
const { connectToMongoDB } = require("./mongo_config");
const urlRouter = require("./routes/url");
const topicRouter = require("./routes/topic");
const staticRoute = require("./routes/staticRoute");
const cors = require("cors");
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/category");

//! middleware for the url router which is store in to log file
const { logRequest } = require("./midddelware/logfile");

const app = express();
const port = 3001;

// Connect to MongoDB
connectToMongoDB();

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
  console.error("Error details:", err);

  // Handle mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      details: Object.values(err.errors).map((e) => e.message),
    });
  }

  // Handle mongoose duplicate key errors
  if (err.code === 11000) {
    return res.status(409).json({
      error: "Duplicate Entry",
      details: "A record with this ID already exists",
    });
  }

  // Handle mongoose cast errors
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID",
      details: "The provided ID is not valid",
    });
  }

  // Default error response
  res.status(500).json({
    error: "Internal Server Error",
    details: err.message || "Something went wrong!",
  });
});

// view engine setup
app.set("view engine", "ejs").set("views", path.resolve("./views"));

//routes
// app.use("/", staticRoute);
// app.use("/url", urlRouter);
app.use("/topics", topicRouter);
app.use("/categories", categoryRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    mongodb: mongoose.connection.readyState === 1,
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
