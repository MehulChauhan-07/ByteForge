const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
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
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    topics: [
      {
        type: String,
        ref: "Topic",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
categorySchema.index({ id: 1 }, { unique: true });
categorySchema.index({ order: 1 });

module.exports = mongoose.model("Category", categorySchema);
