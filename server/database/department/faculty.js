const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
  name: { type: String },
  degree: { type: String },
  position: { type: String },
  image: [{ type: String }],
  status: { type: String },
});

const FacultyModel = mongoose.model("faculty", FacultySchema);
module.exports = FacultyModel;
