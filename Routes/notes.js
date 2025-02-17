const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const auth = require("../middleware/auth");

// Get all notes for a user
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).sort({
      updatedAt: -1,
    });
    res.json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notes", error: error.message });
  }
});

// Create a new note
router.post("/", auth, async (req, res) => {
  try {
    const { title, content, isAudioNote, imageUrl } = req.body;
    const note = new Note({
      userId: req.userId,
      title,
      content,
      isAudioNote,
      imageUrl,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating note", error: error.message });
  }
});

// Update a note
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content, isFavorite, imageUrl } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, content, isFavorite, imageUrl, updatedAt: Date.now() },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating note", error: error.message });
  }
});

// Delete a note
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting note", error: error.message });
  }
});

module.exports = router;
