const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const ApiKey = require("../models/Apikeys");
const mongoose = require("mongoose");


router.post("/generate-key", async (req, res) => {
  try {
    const { userId } = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID" });
    }

   
    const existingKeys = await ApiKey.find({ userId });
    if (existingKeys.length >= 3) {
      return res.status(400).json({ error: "Max 3 API keys allowed per user" });
    }

    
    const newApiKey = new ApiKey({ userId, apiKey: uuidv4() });
    await newApiKey.save();

    
    res.status(201).json({ message: "API key generated successfully", apiKey: newApiKey.apiKey, userId });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;