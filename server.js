require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimiter = require("./middleware/rateLimit");

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => console.error("MongoDB Error:", err));

app.use("/api", require("./routes/api"));
app.use("/api/key", require("./routes/Apikeys"));
app.use("/api/plan", require("./routes/planSwitch"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));