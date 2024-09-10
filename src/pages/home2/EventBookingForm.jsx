import React, { useState, useEffect } from "react";
import "../../styles/Booking/EventBookingForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// import hotelRoom from '../../images/rooms/room3.jpeg';

const EventBookingForm = () => {
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
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="event-home">
      <div className="addEventBooking">
        <p className="formtitle">Event Booking</p>
        <form className="addEventBookingForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="eventid">Event ID</label>
            <input
              type="text"
              onChange={inputHandler}
              name="eventid"
              id="eventid"
              value={event.eventid}
              disabled
            />
          </div>
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
              placeholder="Enter your current Address"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              onChange={inputHandler}
              name="phone"
              id="phone"
              placeholder="Enter your Phone Number"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={inputHandler}
              name="email"
              id="email"
              placeholder="Enter your valid Email address"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="date">Date of Booking</label>
            <input type="date" onChange={inputHandler} name="date" id="date" />
          </div>

          <div className="inputGroup">
            <Link to="/orderform">
              <button type="submit">Add Booking</button>
            </Link>
          </div>
        </form>
      </div>

      {/* <div className='sideImage'>
                <img src={hotelRoom} className="sideimg" />
            </div> */}
    </div>
  );
};

export default EventBookingForm;
