// routes/videoRoutes.js
import express from "express";
import Video from "../models/Video.js";

const router = express.Router();

// POST → Add new video
router.post("/add", async (req, res) => {
  try {
    const { title, description, tags, thumbnail, embedUrl } = req.body;
    const newVideo = new Video({ title, description, tags, thumbnail, embedUrl });
    await newVideo.save();
    res.status(201).json({ message: "Video added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add video" });
  }
});

// GET → All videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().sort({ date: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Error fetching videos" });
  }
});

// GET → Single video by ID
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: "Error fetching video" });
  }
});

// DELETE → Admin only (for later)
router.delete("/:id", async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

export default router;
 
