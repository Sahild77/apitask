const Apikeys = require("../models/Apikeys");
const apiKey = require("../models/Apikeys");


const apiAuth = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) return res.status(401).json({ error: "API key required" });

  const keyExists = await Apikeys.findOne({ apiKey });
  if (!keyExists) return res.status(403).json({ error: "Invalid API key" });

  next(); 
};

module.exports = apiAuth;