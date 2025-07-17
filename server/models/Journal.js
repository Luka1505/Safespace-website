const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    default: "😐",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Journal", JournalSchema);
