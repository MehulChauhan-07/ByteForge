const fs = require("fs");

const { formatDate, formatTime } = require("./formats");
const port = 3000;
function logRequest(filename) {
  return (req, res, next) => {
    const now = new Date(); // Get current date and time
    const formattedDate = formatDate(now); // Format date
    const formattedTime = formatTime(now); // Format time
    const requestTime = `[${formattedDate} ${formattedTime}]: ${req.method}: http//localhost:${port}${req.path}\n`; // Combine date and time
    fs.appendFile(filename, requestTime, "utf-8", (err) => {
      if (err) {
        console.error("Failed to write to log file:", err);
      }
      next();
    });
  };
}

module.exports = { logRequest };
