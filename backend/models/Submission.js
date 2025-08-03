// models/Submission.js
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  eventDate: {
    type: Date,
  },
  eventType: {
    type: String,
    enum: ["birthday", "corporate", "festival", "school", "other"],
  },
  message: {
    type: String,
    required: true,
  },
  queuePosition: {
    type: Number,
    required: true,
  },
  waitTimeMinutes: {
    type: Number,
    required: true,
  },
  canSubmitAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
