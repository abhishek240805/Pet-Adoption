// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB connection error:", err));

// ✅ Default route for browser
app.get("/", (req, res) => {
  res.send("🐾 PawfectMatch backend is running & connected to MongoDB!");
});

// ✅ Import pet routes
const petRoutesPath = path.join(__dirname, "routes", "petRoutes.js");
console.log("📁 Loading routes from:", petRoutesPath);

try {
  const petRoutes = require(petRoutesPath);
  app.use("/api/pets", petRoutes);
  console.log("✅ Pet routes loaded successfully");
} catch (err) {
  console.error("❌ Failed to load petRoutes:", err);
}

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));