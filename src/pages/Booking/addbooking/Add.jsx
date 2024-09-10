import React, { useState } from "react";
import "../../../styles/Booking/add.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Add = () => {
  const navigate = useNavigate();

  const bookings = {
    roomid: "",
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
    date: new Date(),
    roomtype: "",
  };

  const [booking, setBooking] = useState(bookings);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/api/create", booking)
      .then((response) => {
        toast.success(response.data.msg, {
          position: "top-right",
          className: "alert",
        });
        navigate("/booking");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="add-booking-bg">
      <div className="addBooking">
        <Link to={"/booking"} className="backHome">
          Back to Home
        </Link>
        <h3>Add New Booking</h3>
        <form className="addBookingForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="roomid">Room Id</label>
            <select
              name="roomid"
              id="roomid"
              onChange={inputHandler}
              value={booking.roomid}
            >
              <option value="" disabled>
                Select Room Id
              </option>
              <option value="Room001">Room001</option>
              <option value="Room002">Room002</option>
              <option value="Room003">Room003</option>
            </select>
          </div>
          <br />
          <div className="inputGroup">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              onChange={inputHandler}
              name="firstname"
              id="firstname"
              placeholder="First name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              onChange={inputHandler}
              name="lastname"
              id="lastname"
              placeholder="Last name"
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
            <label>Room Type</label>
            <div>
              <input
                type="radio"
                id="deluxe"
                name="roomtype"
                value="deluxe"
                onChange={inputHandler}
              />
              <label className="roomt" htmlFor="single">
                Deluxe
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="non_ac"
                name="roomtype"
                value="non_ac"
                onChange={inputHandler}
              />
              <label className="roomt" htmlFor="double">
                Non-AC
              </label>
            </div>
          </div>
          <div className="inputGroup">
            <button type="submit">Add Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
