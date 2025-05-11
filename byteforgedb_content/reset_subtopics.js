const mongoose = require("mongoose");
const SubTopic = require("./models/subtopic_Schema");

const MONGODB_URI = "mongodb://localhost:27017/byteforgedb";

async function resetSubtopics() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to MongoDB successfully");

    // Drop the existing collection
    await mongoose.connection.db.dropCollection("subtopics");
    console.log("Dropped existing subtopics collection");

    // Create new collection with updated schema
    await SubTopic.createCollection();
    console.log("Created new subtopics collection with updated schema");

    // Create indexes
    await SubTopic.createIndexes();
    console.log("Created indexes for subtopics collection");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("\nMongoDB connection closed");
  }
}

resetSubtopics();
