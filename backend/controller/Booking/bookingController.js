const Booking = require("../../model/Booking/bookingModel.js");

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

// C - Create (create a new booking)
const create = async (req, res) => {
  try {

    const { email, phone, date } = req.body;

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    // Validate phone number format
    if (!validatePhoneNumber(phone)) {
      return res.status(400).json({ msg: "Invalid phone number format" });
    }

    // Validate date (today or future)
    if (!validateDate(date)) {
      return res.status(400).json({ msg: "Invalid date. Date should be today or in the future." });
    }

    const bookingData = new Booking(req.body);

    // check if the user exist
    if (!bookingData) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    const savedData = await bookingData.save();
    res
      .status(200)
      .json({ msg: "Booking Added Successfully", data: savedData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// R - Read (Read all bookings)
const getAll = async (req, res) => {
  try {
    const bookingData = await Booking.find();

    // check if the booking exist
    if (!bookingData) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Display all bookings
    res.status(200).json(bookingData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// R - Read (Read particular booking by id)
const getOne = async (req, res) => {
  try {
    // get the user id
    const id = req.params.id;

    // pass the id to the function
    const bookingExist = await Booking.findById(id);

    // check if the booking exist
    if (!bookingExist) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Display the booking according to the id
    res.status(200).json(bookingExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// U - Update (Update particular booking by id)
const updateBooking = async (req, res) => {
  try {
    // get the booking id
    const id = req.params.id;

    // pass the id to the function
    const bookingExist = await Booking.findById(id);

    // check if the booking exist
    if (!bookingExist) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Update the booking data
    const updateData = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Display the updated data
    res.status(200).json({ msg: "Booking Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// D - Delete (Delete User)
const deleteBooking = async (req, res) => {
  try {
    // get the booking id
    const id = req.params.id;

    // pass the id to the function
    const bookingExist = await Booking.findById(id);

    // check if the booking exist
    if (!bookingExist) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Delete the booking
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ msg: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  updateBooking,
  deleteBooking
};
