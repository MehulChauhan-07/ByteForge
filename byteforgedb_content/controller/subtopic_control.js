const subtopicService = require("../services/subtopicService");

// Get all subtopics
const getAllSubtopics = async (req, res) => {
  try {
    const subtopics = await subtopicService.getAllSubtopics();
    res.json(subtopics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get subtopic by ID
const getSubtopicById = async (req, res) => {
  try {
    const subtopic = await subtopicService.getSubtopicById(req.params.id);
    res.json(subtopic);
  } catch (error) {
    if (error.message === "Subtopic not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Get subtopics by topic ID
const getSubtopicsByTopicId = async (req, res) => {
  try {
    const subtopics = await subtopicService.getSubtopicsByTopicId(
      req.params.topicId
    );
    res.json(subtopics);
  } catch (error) {
    if (error.message === "Topic not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Create or update subtopic
const createSubtopic = async (req, res) => {
  try {
    const result = await subtopicService.createSubtopic(
      req.params.topicId,
      req.body
    );
    res.status(201).json(result);
  } catch (error) {
    if (error.message === "Topic not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Update subtopic
const updateSubtopic = async (req, res) => {
  try {
    const subtopic = await subtopicService.updateSubtopic(
      req.params.id,
      req.body
    );
    res.json(subtopic);
  } catch (error) {
    if (error.message === "Subtopic not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Delete subtopic
const deleteSubtopic = async (req, res) => {
  try {
    const subtopic = await subtopicService.deleteSubtopic(req.params.id);
    res.json({ message: "Subtopic deleted successfully", subtopic });
  } catch (error) {
    if (error.message === "Subtopic not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = {
  getAllSubtopics,
  getSubtopicById,
  getSubtopicsByTopicId,
  createSubtopic,
  updateSubtopic,
  deleteSubtopic,
};
