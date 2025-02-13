const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserPlan = require("../models/userPlan");
const Plan = require("../models/plans");


router.post("/switch-plan", async (req, res) => {
  try {
    const { userId, newPlanId } = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID" });
    }

    
    if (!mongoose.Types.ObjectId.isValid(newPlanId)) {
      return res.status(400).json({ error: "Invalid Plan ID" });
    }

    
    const plan = await Plan.findById(newPlanId);
    if (!plan) {
      return res.status(400).json({ error: "Invalid plan" });
    }

    
    await UserPlan.findOneAndUpdate(
      { userId },
      { planId: newPlanId },
      { upsert: true, new: true }
    );

    
    const updatedUserPlan = await UserPlan.findOne({ userId }).populate("planId");
    res.json({ message: `Plan switched to ${updatedUserPlan.planId.name}`, updatedUserPlan });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
