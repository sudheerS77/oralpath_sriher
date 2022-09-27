const mongoose = require("mongoose");

const BrochureSchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  url: [
    {
      type: String,
    },
  ],
  status: { type: String },
});

const BrochureModel = mongoose.model("brochure", BrochureSchema);

module.exports = BrochureModel;
