
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "frontend")));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const MySchema = new mongoose.Schema({
  item: String,
  price: Number,
});
const MyModel = mongoose.model("MyCollection", MySchema);

// API endpoint to fetch data
app.get("/api/data", async (req, res) => {
  try {
    const data = await MyModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Fallback to serve frontend for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/index.html"));
});

// Start the server

