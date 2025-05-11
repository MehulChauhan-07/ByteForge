const SubTopic = require("../models/subtopic_Schema");
const Topic = require("../models/topic_Schema");

class SubtopicService {
  // Get all subtopics
  async getAllSubtopics() {
    try {
      return await SubTopic.find({}).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching subtopics: ${error.message}`);
    }
  }

  // Get subtopic by ID
  async getSubtopicById(id) {
    try {
      const subtopic = await SubTopic.findOne({ subtopicId: id });
      if (!subtopic) {
        throw new Error("Subtopic not found");
      }
      return subtopic;
    } catch (error) {
      throw new Error(`Error fetching subtopic: ${error.message}`);
    }
  }

  // Get subtopics by topic ID
  async getSubtopicsByTopicId(topicId) {
    try {
      const topic = await Topic.findOne({ id: topicId });
      if (!topic) {
        throw new Error("Topic not found");
      }
      return await SubTopic.find({ topicId: topicId }).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching subtopics: ${error.message}`);
    }
  }

  // Create or update subtopic
  async createSubtopic(topicId, subtopicData) {
    try {
      // Verify topic exists
      const topic = await Topic.findOne({ id: topicId });
      if (!topic) {
        throw new Error("Topic not found");
      }

      // Check for existing subtopic
      const existingSubtopic = await SubTopic.findOne({
        subtopicId: subtopicData.subtopicId,
      });

      if (existingSubtopic) {
        // Update existing subtopic
        const updatedSubtopic = await SubTopic.findOneAndUpdate(
          { subtopicId: subtopicData.subtopicId },
          {
            ...subtopicData,
            topicId: topicId,
          },
          { new: true, runValidators: true }
        );
        return {
          subtopic: updatedSubtopic,
          message: "Subtopic updated successfully",
        };
      }

      // Create new subtopic
      const subtopic = await SubTopic.create({
        ...subtopicData,
        topicId: topicId,
      });

      return {
        subtopic,
        message: "Subtopic created successfully",
      };
    } catch (error) {
      throw new Error(`Error creating/updating subtopic: ${error.message}`);
    }
  }

  // Update subtopic
  async updateSubtopic(id, updateData) {
    try {
      const subtopic = await SubTopic.findOneAndUpdate(
        { subtopicId: id },
        updateData,
        { new: true, runValidators: true }
      );

      if (!subtopic) {
        throw new Error("Subtopic not found");
      }

      return subtopic;
    } catch (error) {
      throw new Error(`Error updating subtopic: ${error.message}`);
    }
  }

  // Delete subtopic
  async deleteSubtopic(id) {
    try {
      const subtopic = await SubTopic.findOneAndDelete({ subtopicId: id });
      if (!subtopic) {
        throw new Error("Subtopic not found");
      }
      return subtopic;
    } catch (error) {
      throw new Error(`Error deleting subtopic: ${error.message}`);
    }
  }
}

module.exports = new SubtopicService();
