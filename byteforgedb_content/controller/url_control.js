const URL = require("../models/url_Schema");
const shortid = require("shortid");

// Get all URLs
const handleGetAllUrls = async (req, res) => {
  try {
    const urls = await URL.find({}).sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
};

// Create new short URL
const handlenewShortURL = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortID = shortid();
    const newUrl = await URL.create({
      shortId: shortID,
      originalUrl: originalUrl,
      visitHistory: [],
    });

    return res.status(201).json(newUrl);
  } catch (error) {
    console.error("Error creating URL:", error);
    res.status(500).json({ error: "Failed to create short URL" });
  }
};

// Redirect to original URL
const handleRedirectUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!entry) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.redirect(entry.originalUrl);
  } catch (error) {
    console.error("Error redirecting URL:", error);
    res.status(500).json({ error: "Failed to redirect URL" });
  }
};

// Get URL analytics
const handleGetAnalytics = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    console.error("Error getting analytics:", error);
    res.status(500).json({ error: "Failed to get URL analytics" });
  }
};

// Update URL
const handleUpdateUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    const updatedUrl = await URL.findByIdAndUpdate(
      id,
      { originalUrl },
      { new: true }
    );

    if (!updatedUrl) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json(updatedUrl);
  } catch (error) {
    console.error("Error updating URL:", error);
    res.status(500).json({ error: "Failed to update URL" });
  }
};

// Delete URL
const handleDeleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUrl = await URL.findByIdAndDelete(id);

    if (!deletedUrl) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json({ message: "URL deleted successfully" });
  } catch (error) {
    console.error("Error deleting URL:", error);
    res.status(500).json({ error: "Failed to delete URL" });
  }
};

module.exports = {
  handlenewShortURL,
  handleRedirectUrl,
  handleGetAnalytics,
  handleGetAllUrls,
  handleUpdateUrl,
  handleDeleteUrl,
};
