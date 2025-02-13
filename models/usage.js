const mongoose = require("mongoose");

const UsageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  api_keys: { type: Number, required: true },
  requestCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Usage", UsageSchema);