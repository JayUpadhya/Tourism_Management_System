const Event = require("../../model/Event/eventModel.js");

// Function to validate email format using regular expression
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate phone number format (10 digits)
const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

// Function to validate date (today or future)
const validateDate = (dateString) => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  // Set hours, minutes, seconds, and milliseconds to 0 for both dates
  inputDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  // Compare input date with current date
  return inputDate >= currentDate;
};

// C - Create (create a new event)
const create = async (req, res) => {
  try {
    const eventData = new Event(req.body);

    // check if the event exist
    if (!eventData) {
      return res.status(404).json({ msg: "Event not found" });
    }

    const savedData = await eventData.save();
    res
      .status(200)
      .json({ msg: "Event Added Successfully", data: savedData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// R - Read (Read all events)
const getAll = async (req, res) => {
  try {
    const eventData = await Event.find();

    // check if the event exist
    if (!eventData) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Display all events
    res.status(200).json(eventData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// R - Read (Read particular event by id)
const getOne = async (req, res) => {
  try {
    // get the event id
    const id = req.params.id;

    // pass the id to the function
    const eventExist = await Event.findById(id);

    // check if the event exist
    if (!eventExist) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Display the event according to the id
    res.status(200).json(eventExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// U - Update (Update particular event by id)
const updateEvent = async (req, res) => {
  try {
    // get the event id
    const id = req.params.id;

    // pass the id to the function
    const eventExist = await Event.findById(id);

    // check if the event exist
    if (!eventExist) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Update the event data
    const updateData = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Display the updated data
    res.status(200).json({ msg: "Event Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// D - Delete (Delete Event)
const deleteEvent = async (req, res) => {
  try {
    // get the event id
    const id = req.params.id;

    // pass the id to the function
    const eventExist = await Event.findById(id);

    // check if the event exist
    if (!eventExist) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Delete the event
    await Event.findByIdAndDelete(id);
    res.status(200).json({ msg: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  updateEvent,
  deleteEvent
};
