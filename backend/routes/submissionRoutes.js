// routes/submissionRoutes.js
import express from "express";
import Submission from "../models/Submission.js";
import Queue from "../models/Queue.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get all submissions (protected)
router.get("/", authenticateAdmin, async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching submissions" });
  }
});

// Get current queue status
router.get("/queue-status", async (req, res) => {
  try {
    const queue = await Queue.getQueue();
    res.status(200).json({
      currentPosition: queue.currentPosition,
      isActive: queue.isActive,
      lastSubmissionTime: queue.lastSubmissionTime,
    });
  } catch (error) {
    console.error("Error fetching queue status:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching queue status" });
  }
});

// Reset queue (admin only)
router.post("/reset-queue", authenticateAdmin, async (req, res) => {
  try {
    const queue = await Queue.resetQueue();
    res.status(200).json({
      message: "Queue reset successfully",
      queue: {
        currentPosition: queue.currentPosition,
        isActive: queue.isActive,
        lastSubmissionTime: queue.lastSubmissionTime,
      },
    });
  } catch (error) {
    console.error("Error resetting queue:", error);
    res.status(500).json({ message: "Server error while resetting queue" });
  }
});

// Create a new submission with queue logic
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, eventDate, eventType, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required" });
    }

    // Get current queue state
    const queue = await Queue.getQueue();

    // Increment queue position
    const newPosition = queue.currentPosition + 1;

    // Calculate wait time (first person waits 0 minutes, then 15 min intervals)
    const waitTimeMinutes = (newPosition - 1) * 15;

    // Calculate when they can actually submit (for reference)
    const canSubmitAt = new Date(Date.now() + waitTimeMinutes * 60 * 1000);

    // Create submission with queue info
    const submission = new Submission({
      name,
      email,
      phone,
      eventDate: eventDate || null,
      eventType,
      message,
      queuePosition: newPosition,
      waitTimeMinutes,
      canSubmitAt,
    });

    await submission.save();

    // Update queue state
    queue.currentPosition = newPosition;
    queue.lastSubmissionTime = new Date();
    queue.isActive = true;
    queue.updatedAt = new Date();
    await queue.save();

    // Return response with queue information
    res.status(201).json({
      message: "Submission received successfully",
      submission,
      queueInfo: {
        position: newPosition,
        waitTimeMinutes,
        isFirstInQueue: newPosition === 1,
        canSubmitAt,
      },
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    res.status(500).json({ message: "Server error while creating submission" });
  }
});

// Get submission by ID (protected)
router.get("/:id", authenticateAdmin, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    res.status(500).json({ message: "Server error while fetching submission" });
  }
});

// Delete submission (protected)
router.delete("/:id", authenticateAdmin, async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (error) {
    console.error("Error deleting submission:", error);
    res.status(500).json({ message: "Server error while deleting submission" });
  }
});

export default router;
