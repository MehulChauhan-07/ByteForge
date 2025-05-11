const mongoose = require("mongoose");

const subtopicSchema = new mongoose.Schema(
  {
    subtopicId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    topicId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    estimatedTime: {
      type: String,
      required: true,
    },
    content: [
      {
        type: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    codeExamples: [
      {
        title: String,
        code: String,
        language: String,
        description: String,
      },
    ],
    resources: [
      {
        title: String,
        url: String,
        type: {
          type: String,
          enum: ["tutorial", "video", "article", "documentation", "other"],
        },
        description: String,
        level: String,
      },
    ],
    quizQuestions: [
      {
        question: String,
        options: [String],
        correctAnswer: Number,
        explanation: String,
        difficulty: String,
        timeLimit: Number,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Drop existing indexes to avoid conflicts
subtopicSchema.index({ subtopicId: 1 }, { unique: true });
subtopicSchema.index({ topicId: 1 });

// Create compound index for topicId and subtopicId
subtopicSchema.index({ topicId: 1, subtopicId: 1 }, { unique: true });

const SubTopic = mongoose.model("SubTopic", subtopicSchema);

module.exports = SubTopic;
