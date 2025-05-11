const topicService = require("../services/topicService");
const mongoose = require("mongoose");

// Get all topics
const getAllTopics = async (req, res) => {
  try {
    console.log("Attempting to fetch all topics...");

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error("MongoDB is not connected");
      return res.status(500).json({ error: "Database connection error" });
    }

    const topics = await topicService.getAllTopics();
    console.log(`Found ${topics.length} topics`);

    if (topics.length === 0) {
      return res.status(200).json({ message: "No topics found", topics: [] });
    }

    res.json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get topic by ID
const getTopicById = async (req, res) => {
  try {
    const topic = await topicService.getTopicById(req.params.id);
    res.json(topic);
  } catch (error) {
    console.error("Error fetching topic:", error);
    res
      .status(error.message === "Topic not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

// Get topics by category
const getTopicsByCategory = async (req, res) => {
  try {
    const topics = await topicService.getTopicsByCategory(
      req.params.categoryId
    );
    res.json(topics);
  } catch (error) {
    console.error("Error fetching topics by category:", error);
    res
      .status(error.message === "Category not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

// Create topic
const createTopic = async (req, res) => {
  try {
    const topic = await topicService.createTopic(req.body);
    res.status(201).json(topic);
  } catch (error) {
    console.error("Error creating topic:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update topic
const updateTopic = async (req, res) => {
  try {
    const topic = await topicService.updateTopic(req.params.id, req.body);
    res.json(topic);
  } catch (error) {
    console.error("Error updating topic:", error);
    res
      .status(error.message === "Topic not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

// Delete topic
const deleteTopic = async (req, res) => {
  try {
    const topic = await topicService.deleteTopic(req.params.id);
    res.json({
      message: "Topic deleted successfully",
      deletedTopic: topic,
    });
  } catch (error) {
    console.error("Error deleting topic:", error);
    res
      .status(error.message === "Topic not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

module.exports = {
  getAllTopics,
  getTopicById,
  getTopicsByCategory,
  createTopic,
  updateTopic,
  deleteTopic,
};
