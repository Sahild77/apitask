const express = require("express");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const User = require("../models/user");
const Plan = require("../models/plans");
const Usage = require("../models/usage");


router.post("/user", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const apiKey = uuidv4(); 

    const newUser = new User({ name, email, password: hashedPassword, api_keys: [apiKey] });

    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser, apiKey });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/plans", async (req, res) => {
  try {
    const { planId, name, price } = req.body;

    if (!planId || !name || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newPlan = new Plan({ 
      planId, 
      name, 
      price, 
      insertedAt: new Date(), 
      updatedAt: new Date() 
    });

    await newPlan.save();

    res.status(201).json({ message: "Plan created successfully", plan: newPlan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/usage", async (req, res) => {
  try {
    const usageData = await Usage.find();
    res.json(usageData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching usage data" });
  }
});

router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

router.get("/plans", async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: "Error fetching plans" });
  }
});

module.exports = router;
