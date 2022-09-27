const mongoose = require("mongoose");

const EventsRegisterSchema = new mongoose.Schema({
  event_id: { type: String },
  user_id: { type: String },
  user_name: { type: String },
  eventName: { type: String },
  eventCostType: { type: String },
  paymentStatus: { type: Boolean },
  registrationDate: { type: Date, default: Date.now },
  user_email: { type: String },
  user_phonenumber: [{ type: Number }],
  user_institution: { type: String },
  user_State: { type: String },
  venue: { type: String },
  event_start_data: { type: String },
  event_end_data: { type: String },
  event_link: { type: String },
});

const EventRegisterModel = mongoose.model(
  "EventsRegister",
  EventsRegisterSchema
);
module.exports = EventRegisterModel;
