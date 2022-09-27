const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  imageType: { type: String },
  images: [{ type: String }],
});

const GalleryModel = mongoose.model("gallery", GallerySchema);
module.exports = GalleryModel;
