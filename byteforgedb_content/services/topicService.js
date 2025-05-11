const Topic = require("../models/topic_Schema");
const Category = require("../models/category_Schema");

class TopicService {
  // Get all topics
  async getAllTopics() {
    try {
      return await Topic.find({}).sort({ updatedAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching topics: ${error.message}`);
    }
  }

  // Get topic by ID
  async getTopicById(id) {
    try {
      const topic = await Topic.findOne({ id });
      if (!topic) {
        throw new Error("Topic not found");
      }
      return topic;
    } catch (error) {
      throw new Error(`Error fetching topic: ${error.message}`);
    }
  }

  // Get topics by category
  async getTopicsByCategory(categoryId) {
    try {
      const category = await Category.findOne({ id: categoryId });
      if (!category) {
        throw new Error("Category not found");
      }
      return await Topic.find({ category: categoryId }).sort({ updatedAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching topics by category: ${error.message}`);
    }
  }

  // Create topic
  async createTopic(topicData) {
    try {
      const existingTopic = await Topic.findOne({ id: topicData.id });
      if (existingTopic) {
        throw new Error(`Topic with ID ${topicData.id} already exists`);
      }

      // Verify category exists
      const category = await Category.findOne({ id: topicData.category });
      if (!category) {
        throw new Error(`Category with ID ${topicData.category} not found`);
      }

      const topic = await Topic.create(topicData);

      // Add topic to category's topics array
      await Category.findOneAndUpdate(
        { id: topicData.category },
        { $push: { topics: topic.id } }
      );

      return topic;
    } catch (error) {
      throw new Error(`Error creating topic: ${error.message}`);
    }
  }

  // Create multiple topics
  async createMultipleTopics(topicsData) {
    const results = {
      created: [],
      errors: [],
    };

    for (const topicData of topicsData) {
      try {
        const topic = await this.createTopic(topicData);
        results.created.push(topic);
      } catch (error) {
        results.errors.push({
          id: topicData.id,
          error: error.message,
        });
      }
    }

    return results;
  }

  // Update topic
  async updateTopic(id, updateData) {
    try {
      const topic = await Topic.findOne({ id });
      if (!topic) {
        throw new Error("Topic not found");
      }

      // If category is being updated, verify new category exists
      if (updateData.category && updateData.category !== topic.category) {
        const category = await Category.findOne({ id: updateData.category });
        if (!category) {
          throw new Error(`Category with ID ${updateData.category} not found`);
        }

        // Remove topic from old category
        await Category.findOneAndUpdate(
          { id: topic.category },
          { $pull: { topics: topic.id } }
        );

        // Add topic to new category
        await Category.findOneAndUpdate(
          { id: updateData.category },
          { $push: { topics: topic.id } }
        );
      }

      return await Topic.findOneAndUpdate({ id }, updateData, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw new Error(`Error updating topic: ${error.message}`);
    }
  }

  // Delete topic
  async deleteTopic(id) {
    try {
      const topic = await Topic.findOne({ id });
      if (!topic) {
        throw new Error("Topic not found");
      }

      // Remove topic from category's topics array
      await Category.findOneAndUpdate(
        { id: topic.category },
        { $pull: { topics: topic.id } }
      );

      return await Topic.findOneAndDelete({ id });
    } catch (error) {
      throw new Error(`Error deleting topic: ${error.message}`);
    }
  }
}

module.exports = new TopicService();
