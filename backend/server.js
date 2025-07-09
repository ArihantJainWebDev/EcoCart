const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://your-production-frontend.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/cors-test", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");
  res.send("CORS is working!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected via Railway"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// MongoDB Schemas
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  scanned: [
    {
      title: String,
      score: Number,
      reward: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});
const User = mongoose.model("User", userSchema);

const publicScanSchema = new mongoose.Schema({
  title: String,
  score: Number,
  reward: Number,
  carbon: String,
  plastic: String,
  chemicals: String,
  date: { type: Date, default: Date.now },
});
const PublicScan = mongoose.model("PublicScan", publicScanSchema);

// 🔐 Signup
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed });
  await user.save();

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

// 🔐 Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const match = user && (await bcrypt.compare(password, user.password));

  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

// 🔒 Authenticated Scan Save
app.post("/api/scan", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email });
    const { title, score, reward } = req.body;

    const already = user.scanned.find((item) => item.title === title);
    if (already) return res.json({ message: "Already scanned" });

    user.scanned.push({ title, score, reward });
    await user.save();

    res.json({ message: "Scan saved successfully" });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

// 📜 Get Scan History (Auth)
app.get("/api/history", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email });
    res.json(user.scanned);
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

// 🌿 Save Public Scan (No auth - used by extension)
app.post("/api/public-scan", async (req, res) => {
  const { title, score, reward, carbon, plastic, chemicals } = req.body;

  try {
    await PublicScan.create({ title, score, reward, carbon, plastic, chemicals });
    res.status(201).json({ message: "Public scan saved ✅" });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to save public scan" });
  }
});

// 📋 Get Public Scan History
app.get("/api/public-history", async (req, res) => {
  try {
    const scans = await PublicScan.find().sort({ date: -1 });
    res.json(scans);
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to fetch public scan history" });
  }
});

// 🔁 Generate Dummy Eco Score
app.get("/api/score", (req, res) => {
  const { title } = req.query;

  if (!title) return res.status(400).json({ error: "Product title is required" });

  const score = Math.floor(Math.random() * 30) + 60; // Score between 60–89
  const carbon = (Math.random() * 3 + 0.5).toFixed(2) + " kg CO₂";
  const plastic = Math.floor(Math.random() * 100 + 10) + "g";
  const chemicals = ["Low", "Moderate", "High", "None"][Math.floor(Math.random() * 4)];
  const reward = Math.floor(score / 10);

  return res.json({
    title,
    score,
    reward,
    carbon,
    plastic,
    chemicals,
  });
});

// 🌐 Root
app.get("/", (req, res) => {
  res.send("🌱 EcoCart backend is running!");
});

app.listen(port, () =>
  console.log(`🚀 EcoCart backend running on port ${port}`)
);