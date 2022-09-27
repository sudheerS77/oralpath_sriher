const mongoose = require("mongoose");

const VisitingFacultySchema = new mongoose.Schema({
  name: { type: String },
  position: { type: String },
  image: [{ type: String }],
  degree: { type: String },
  status: { type: String },
});

const VisitingFacultyModel = mongoose.model(
  "visitingFaculty",
  VisitingFacultySchema
);
module.exports = VisitingFacultyModel;
