import axios from "axios";
import { Topic, Subtopic, Category } from "../types";

const API_BASE_URL = "http://localhost:3001";

class TopicService {
  async getAllTopics(): Promise<Topic[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/topics`);
      return response.data.map((topic: Topic) => ({
        ...topic,
        subtopics: topic.subtopics || [],
      }));
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  }

  async getTopicById(id: string): Promise<Topic> {
    try {
      const response = await axios.get(`${API_BASE_URL}/topics/${id}`);
      return {
        ...response.data,
        subtopics: response.data.subtopics || [],
      };
    } catch (error) {
      console.error(`Error fetching topic ${id}:`, error);
      throw error;
    }
  }

  async getSubtopicsByTopicId(topicId: string): Promise<Subtopic[]> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/topics/${topicId}/subtopics`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching subtopics for topic ${topicId}:`, error);
      throw error;
    }
  }

  async createTopic(topicData: Partial<Topic>): Promise<Topic> {
    try {
      const response = await axios.post(`${API_BASE_URL}/topics`, topicData);
      return {
        ...response.data,
        subtopics: response.data.subtopics || [],
      };
    } catch (error) {
      console.error("Error creating topic:", error);
      throw error;
    }
  }

  async updateTopic(id: string, topicData: Partial<Topic>): Promise<Topic> {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/topics/${id}`,
        topicData
      );
      return {
        ...response.data,
        subtopics: response.data.subtopics || [],
      };
    } catch (error) {
      console.error(`Error updating topic ${id}:`, error);
      throw error;
    }
  }

  async deleteTopic(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/topics/${id}`);
    } catch (error) {
      console.error(`Error deleting topic ${id}:`, error);
      throw error;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }
}

export const topicService = new TopicService();
