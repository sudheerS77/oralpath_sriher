const mongoose = require("mongoose");

const FacultyFeedbackSchema = new mongoose.Schema({
  name: { type: String },
  degree: { type: String },
  position: { type: String },
  image: [{ type: String }],
  feedback_status: { type: String },
});

const FacultyFeedbackModel = mongoose.model(
  "facultyFeedback",
  FacultyFeedbackSchema
);
module.exports = FacultyFeedbackModel;
