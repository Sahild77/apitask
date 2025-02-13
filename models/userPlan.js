const mongoose = require("mongoose");

const UserPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true }
}, { timestamps: true });

module.exports = mongoose.model("UserPlan", UserPlanSchema);
