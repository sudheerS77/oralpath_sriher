const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  faculty_id: { type: String },
  user_id: { type: String },
  name: { type: String },
  email: { type: String },
  affiliation: { type: String },
  designation: { type: String },
  phoneNumber: { type: Number },
  rating: { type: Number },
  topicRating: { type: Number },
  feedback: { type: String },
  suggestion: { type: String },
  status: { type: String },
});

const FeedbackModel = mongoose.model("feedback", FeedbackSchema);
module.exports = FeedbackModel;
