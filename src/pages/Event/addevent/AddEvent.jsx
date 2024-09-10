import React, { useState, useEffect } from "react";
import "../../../styles/Booking/addEvent.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const events = {
    eventid: eventId,
    eventtype: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    date: new Date(),
  };

  const [event, setEvent] = useState(events);

  useEffect(() => {
    setEvent((prevEvent) => ({ ...prevEvent, eventid: eventId }));
  }, [eventId]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/api/createevent", event)
      .then((response) => {
        toast.success(response.data.msg, {
          position: "top-right",
          className: "alert",
        });
        navigate("/eventbooking");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="event-add">
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
              onChange={inputHandler}
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
                onChange={inputHandler}
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
                onChange={inputHandler}
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
              onChange={inputHandler}
              name="name"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              onChange={inputHandler}
              name="address"
              id="address"
              placeholder="Address"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              onChange={inputHandler}
              name="phone"
              id="phone"
              placeholder="Phone Number"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={inputHandler}
              name="email"
              id="email"
              placeholder="Email address"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="date">Date of Booking</label>
            <input
              type="date"
              onChange={inputHandler}
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

export default AddEvent;
