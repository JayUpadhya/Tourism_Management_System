import React, { useState, useEffect } from "react";
import "../../styles/Booking/HotelBookingForm.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

//import hotelRoom from '../../images/Booking/room3.jpeg';

const HotelBookingForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const bookings = {
    roomid: roomId,
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
    date: new Date(),
    roomtype: "",
  };

  const [booking, setBooking] = useState(bookings);

  useEffect(() => {
    setBooking((prevState) => ({ ...prevState, roomid: roomId }));
  }, [roomId]);

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
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="hotelbooking-booking">
      <div className="addHotelBooking">
        <p className="formtitle">Hotel Room Booking</p>
        <form className="addHotelBookingForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="roomid">Room ID</label>
            <input
              type="text"
              onChange={inputHandler}
              name="roomid"
              id="roomid"
              value={booking.roomid}
              disabled
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              onChange={inputHandler}
              name="firstname"
              id="firstname"
              placeholder="Enter your first name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              onChange={inputHandler}
              name="lastname"
              id="lastname"
              placeholder="Enter your last name"
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

      {/* <div className='sideImage'>
                <img src={hotelRoom} className="sideimg" />
            </div> */}
    </div>
  );
};

export default HotelBookingForm;
