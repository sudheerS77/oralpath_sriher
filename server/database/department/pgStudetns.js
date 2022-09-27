const mongoose = require("mongoose");

const PgStudentsSchema = new mongoose.Schema({
  name: { type: String },
  deg: { type: String },
  description: [
    {
      type: String,
    },
  ],
  image: [{ type: String }],
  year: { type: String },
  status: { type: String },
});

const PGModel = mongoose.model("pgstudents", PgStudentsSchema);
module.exports = PGModel;
