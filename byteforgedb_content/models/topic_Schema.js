const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    duration: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      ref: "Category",
    },
    prerequisites: [
      {
        type: String,
        ref: "Topic",
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    image: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
topicSchema.index({ id: 1 }, { unique: true });
topicSchema.index({ category: 1 });
topicSchema.index({ level: 1 });

module.exports = mongoose.model("Topic", topicSchema);
