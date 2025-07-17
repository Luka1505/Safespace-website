require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

console.log("🌍 MONGO_URI is:", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

// 👉 API ROUTES
const journalRoutes = require("./routes/journal");
app.use("/api/journal", journalRoutes);

// 👉 STATIC FILES
app.use(express.static(path.join(__dirname, "../client")));

// 👉 WILDCARD FOR SPA ROUTES ONLY (but not API)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// 👉 CONNECT TO MONGO
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// 👉 START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
