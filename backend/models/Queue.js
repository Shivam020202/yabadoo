// models/Queue.js
import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
  currentPosition: {
    type: Number,
    default: 0,
  },
  lastSubmissionTime: {
    type: Date,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure only one queue document exists
queueSchema.statics.getQueue = async function () {
  let queue = await this.findOne();
  if (!queue) {
    queue = await this.create({});
  }
  return queue;
};

queueSchema.statics.resetQueue = async function () {
  let queue = await this.findOne();
  if (!queue) {
    queue = await this.create({});
  } else {
    queue.currentPosition = 0;
    queue.lastSubmissionTime = null;
    queue.isActive = false;
    queue.updatedAt = new Date();
    await queue.save();
  }
  return queue;
};

const Queue = mongoose.model("Queue", queueSchema);

export default Queue;
