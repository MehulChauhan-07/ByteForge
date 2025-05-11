const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    originalUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    visitHistory: [
      {
        timestamp: {
          type: Number,
          default: Date.now,
        },
        ip: {
          type: String,
          trim: true,
        },
        userAgent: {
          type: String,
          trim: true,
        },
      },
    ],
    clicks: {
      type: Number,
      default: 0,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for total visits
urlSchema.virtual("totalVisits").get(function () {
  return this.visitHistory.length;
});

// Index for faster queries
urlSchema.index({ shortId: 1 });
urlSchema.index({ originalUrl: 1 });
urlSchema.index({ createdAt: -1 });

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
