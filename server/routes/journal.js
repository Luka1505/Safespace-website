const express = require("express");
const router = express.Router();
const Journal = require("../models/Journal");

// POST a new journal entry
router.post("/", async (req, res) => {
  try {
    const { text, mood } = req.body;

    const newEntry = new Journal({
      text,
      mood,
      date: new Date()
    });

    await newEntry.save();
    res.status(201).json({ message: "Journal entry saved!" });
  } catch (err) {
    console.error("❌ Error saving journal entry:", err);
    res.status(500).json({ error: "Failed to save journal entry" });
  }
});

// ✅ GET all journal entries (MUST be above module.exports)
router.get("/", async (req, res) => {
  try {
    const entries = await Journal.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error("❌ Failed to fetch journals:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router; // ✅ Export AFTER all routes
