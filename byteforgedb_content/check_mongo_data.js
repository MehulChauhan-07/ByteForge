const mongoose = require("mongoose");
const Topic = require("./models/topic_Schema");
const SubTopic = require("./models/subtopic_Schema");

const MONGODB_URI = "mongodb://localhost:27017/byteforgedb";

async function checkData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to MongoDB successfully");

    // Check topics
    console.log("\n=== TOPICS ===");
    const topics = await Topic.find({});
    console.log(`Found ${topics.length} topics:`);
    topics.forEach((topic) => {
      console.log(`- ${topic.title} (ID: ${topic.id})`);
    });

    // Check subtopics
    console.log("\n=== SUBTOPICS ===");
    const subtopics = await SubTopic.find({});
    console.log(`Found ${subtopics.length} subtopics:`);
    subtopics.forEach((subtopic) => {
      console.log(
        `- ${subtopic.title} (ID: ${subtopic.subtopicId}, Topic: ${subtopic.topicId})`
      );
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("\nMongoDB connection closed");
  }
}

checkData();
