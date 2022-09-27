const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String },
  image: { type: String },
  description: [{ type: String }],
  status: { type: String },
});
const ProjectModel = mongoose.model("Projects", ProjectSchema);
module.exports = ProjectModel;
