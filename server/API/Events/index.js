const express = require("express");

//Models
const { EventModel } = require("../../database/Events/index");
const { EventRegisterModel } = require("../../database/Events/eventRegister");
const { UserModel } = require("../../database/user/index");

const Router = express.Router();

/*
ROUTE       :   /
DESCRIPTION :   get all Events
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/", async (req, res) => {
  try {
    const events = await EventModel.find({});
    return res.json({ events });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/*
ROUTE       :   /_id
DESCRIPTION :   get all Events based on _id
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/get/:_id", async (req, res) => {
  try {
    const events = await EventModel.findById(req.params);
    return res.json({ events });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
ROUTE       :   /add-event
DESCRIPTION :   add Events
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POSt
*/
Router.post("/add-event", async (req, res) => {
  try {
    const isAvailable = await EventModel.findOne(req.body.eventData);
    if (isAvailable) {
      throw Error("Event already exist");
    }
    const data = await req.body.eventData;
    await EventModel.create(data);
    res.status(200).json({ message: "Event add successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
ROUTE       :   /update-event
DESCRIPTION :   update event data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   PUT
*/
Router.put("/update-event", async (req, res) => {
  try {
    const data = req.body.eventData;
    await EventModel.findOneAndUpdate(
      { _id: data._id },
      { $set: data },
      { multi: true }
    );
    res.status(200).json({ message: "event updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
ROUTE       :   /delete/:_id
DESCRIPTION :   delete event based on id
PARAMS      :   _id
ACCESS      :   Public
METHOD      :   DELETE
*/
Router.delete("/delete/:_id", async (req, res) => {
  try {
    const _id = req.params;
    const isAvailable = await EventModel.findOne({ _id });
    if (!isAvailable) {
      throw Error("Data Not exist");
    }
    const data = await EventModel.findByIdAndDelete(_id);
    //const da = await EventRegisterModel.findOneAndRemove({event_id: _id});
    const da = await EventRegisterModel.deleteMany({ event_id: _id });

    return res.status(200).json({ message: "Event Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EventRegistration Routes

/*
ROUTE       :   /get-registered-events/:_id
DESCRIPTION :   Get all the registred event based on event id
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/get-registered-events/:_id", async (req, res) => {
  try {
    const data = await EventRegisterModel.find({ event_id: req.params });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
ROUTE       :   /get-registered-events/
DESCRIPTION :   Get all the registred event
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/ Router.get("/get-faculty/:_id", async (req, res) => {
  try {
    const faculty = await FacultyModel.findById(req.params);
    return res.json({ faculty });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
Router.get("/getuserevents/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    const checking_user_events = await EventRegisterModel.find({
      user_id: id,
    });
    const userEvents = [];
    await Promise.all(
      checking_user_events.map(async (data) => {
        if (data.user_id === id) {
          const event_data = await EventModel.findById(data.event_id);
          userEvents.push({
            ...data,
            eventName: event_data?.eventName,
            venue: event_data?.venues,
            event_start_data: event_data?.conferenceStartDate,
            event_end_data: event_data?.conferenceEndDate,
            event_link: event_data?.conferenceURL,
          });
        }
      })
    );
    res.status(200).json({ userEvents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
ROUTE       :   /event-register-user
DESCRIPTION :   register the user for the event
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POSt
*/
Router.post("/event-register-user", async (req, res) => {
  try {
    const data = await req.body.eventRegData;
    const event_data = await EventRegisterModel.find();
    event_data.map((e_data) => {
      if (
        e_data.user_id === data.user_id &&
        e_data.event_id === data.event_id
      ) {
        throw Error("User already Registered for the event");
      }
    });
    await EventRegisterModel.create(data);
    res.status(200).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = Router;