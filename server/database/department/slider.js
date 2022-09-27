const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
  imageType: { type: String },
  image: { type: String },
  status: { type: String },
});

const SliderModel = mongoose.model("slider", SliderSchema);
module.exports = SliderModel;
