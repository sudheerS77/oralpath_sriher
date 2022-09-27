const mongoose = require("mongoose");

const AchievememtSchema = new mongoose.Schema({
  userType: { type: String },
  name: { type: String },
  image: [{ type: String }],
  description: [{ type: String }],
  degree: { type: String },
  position: { type: String },
  status: { type: String },
});

const AchievememtModel = mongoose.model("achievements", AchievememtSchema);

module.exports = AchievememtModel;
