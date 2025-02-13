const mongoose = require("mongoose");

const ApiKeySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  apiKey: { type: String, unique: true, required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ApiKey", ApiKeySchema);