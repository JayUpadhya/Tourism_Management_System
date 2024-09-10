import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../styles/Booking/editEvent.css";
import axios from "axios";
import toast from "react-hot-toast";

const EditEvent = () => {
  const events = {
    eventid: "",
    eventtype: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    date: new Date(),
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(events);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
    console.log(event);
  };

  // useEffect(): React hook for handling side effects in function components. Here, it fetches booking data based on the id parameter when the component mounts or when id changes.
  useEffect(() => {
    // axios.get(): Fetches booking data from the specified API endpoint.
    axios
      .get(`http://localhost:3001/api/getoneevent/${id}`)
      .then((response) => {
        //setEvent(): Updates the event booking state with the received data.
        setEvent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    // e.preventDefault(): Prevents the default form submission behavior.
    e.preventDefault();
    // axios.put(): Sends an HTTP PUT request to update the user data.
    await axios
      .put(`http://localhost:3001/api/updateevent/${id}`, event)
      .then((response) => {
        // toast.success(): Displays a success message using the react-hot-toast library upon successful data update.
        toast.success(response.data.msg, {
          position: "top-right",
          className: "alert",
        });
        // navigate("/"): Navigates back to the home page after a successful update
        navigate("/eventbooking");
      })
      .catch((error) => console.log(error));
  };

  // Showing date in the date field
  function formatDate(dateString) {
    if (!dateString) return ""; // Handle empty or undefined dates

    // Use Date constructor to parse the dateString into a Date object
    const date = new Date(dateString);

    // Check if the parsed date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return ""; // Return empty string if date is invalid
    }

    // Construct YYYY-MM-DD format string
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <div className="edit-event">
      <div className="addBooking">
        <Link to="/eventbooking" className="backHome">
          Back to Home
        </Link>
        <h3>Add New Event Booking</h3>
        <form className="addBookingForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="eventid">Event Id</label>
            <select
              name="eventid"
              id="eventid"
              onChange={inputChangeHandler}
              value={event.eventid}
            >
              <option value="" disabled>
                Select Event Id
              </option>
              <option value="Event001">HOT AIR BALLOONING</option>
              <option value="Event002">SURFING</option>
              <option value="Event003">TRAIN TOURS</option>
              <option value="Event004">BIRD WATCHING</option>
              <option value="Event005">WILD SAFARIES</option>
              <option value="Event006">HIKING</option>
            </select>
          </div>
          <br />
          <div className="inputGroup">
            <label>Event Type</label>
            <div>
              <input
                type="radio"
                id="annual"
                name="eventtype"
                value="annual"
                onChange={inputChangeHandler}
                checked={event.eventtype === "annual"}
              />
              <label className="eventt" htmlFor="single">
                Annual
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="special"
                name="eventtype"
                value="special"
                onChange={inputChangeHandler}
                checked={event.eventtype === "special"}
              />
              <label className="eventt" htmlFor="double">
                Special
              </label>
            </div>
          </div>
          <br />
          <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onChange={inputChangeHandler}
              value={event.name}
              name="name"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              onChange={inputChangeHandler}
              value={event.address}
              name="address"
              id="address"
              placeholder="Address"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              onChange={inputChangeHandler}
              value={event.phone}
              name="phone"
              id="phone"
              placeholder="Phone Number"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={inputChangeHandler}
              value={event.email}
              name="email"
              id="email"
              placeholder="Email address"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="date">Date of Booking</label>
            <input
              type="date"
              onChange={inputChangeHandler}
              value={event.date ? formatDate(event.date) : ""}
              name="date"
              id="date"
              placeholder="Enter your valid Email address"
            />
          </div>

          <div className="inputGroup">
            <button type="submit">Add Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
