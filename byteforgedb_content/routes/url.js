const express = require("express");
const {
  handlenewShortURL,
  handleRedirectUrl,
  handleGetAnalytics,
  handleGetAllUrls,
  handleUpdateUrl,
  handleDeleteUrl,
} = require("../controller/url_control");

const router = express.Router();

router
  .get("/", handleGetAllUrls)
  .post("/", handlenewShortURL)
  .get("/:shortId", handleRedirectUrl)
  .get("/analytics/:shortId", handleGetAnalytics)
  .put("/:id", handleUpdateUrl)
  .delete("/:id", handleDeleteUrl);

module.exports = router;
