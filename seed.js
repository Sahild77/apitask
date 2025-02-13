const mongoose = require("mongoose");
const plan = require("./models/plan");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const plans = [
  { planId: 1, name: "Free", price: "free", maxReqPerSec: 5 },
  { planId: 2, name: "Premium", price: "$10/month", maxReqPerSec: 50 },
];

plans.insertMany(plans)
  .then(() => {
    console.log("Plans inserted");
    mongoose.connection.close();
  })
  .catch(err => console.log(err));