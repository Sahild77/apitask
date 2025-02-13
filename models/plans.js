const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  planId: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  insertedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Plan", PlanSchema);
