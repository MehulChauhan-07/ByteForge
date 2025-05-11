const express = require("express");
const {
  getAllTopics,
  getTopicById,
  getTopicsByCategory,
  createTopic,
  updateTopic,
  deleteTopic,
} = require("../controller/topic_control");

const {
  getAllSubtopics,
  getSubtopicById,
  getSubtopicsByTopicId,
  createSubtopic,
  updateSubtopic,
  deleteSubtopic,
} = require("../controller/subtopic_control");

const router = express.Router();

// Topic routes
router.get("/", getAllTopics);
router.get("/category/:categoryId", getTopicsByCategory);
router.get("/:id", getTopicById);
router.post("/", createTopic);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

// Subtopic routes
router.get("/:topicId/subtopics", getSubtopicsByTopicId);
router.get("/:topicId/subtopics/:id", getSubtopicById);
router.get("/subtopics/:id", getSubtopicById);
router.post("/:topicId/subtopics", createSubtopic);
router.put("/subtopics/:id", updateSubtopic);
router.delete("/subtopics/:id", deleteSubtopic);

module.exports = router;
