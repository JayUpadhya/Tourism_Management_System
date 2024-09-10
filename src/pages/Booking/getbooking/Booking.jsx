import React, { useEffect, useState } from "react";
import "../../../styles/Booking/booking.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  // Retrive all bookings
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3001/api/getall");
      setBookings(response.data);
    };
    fetchData();
  }, []);

  // Delete bookings
  const deleteBooking = async (bookingId) => {
    await axios
      .delete(`http://localhost:3001/api/delete/${bookingId}`)
      .then((response) => {
        setBookings((prevBooking) =>
          prevBooking.filter((booking) => booking._id !== bookingId)
        );
        toast.success(response.data.msg, {
          position: "top-right",
          className: "alert",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="booking-table">
      <div className="bookingTable">
        <h1 className="headerTopic">Room Booking Management</h1>
        <Link to="/add" className="addButton">
          Add Room Booking
        </Link>
        <Link to="/adminpanel" className="homeButton">
          Back to Home Panel
        </Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead className="theading">
            <tr>
              <th>Id</th>
              <th>Room Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Date</th>
              <th>Room Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => {
              return (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.roomid}</td>
                  <td>{booking.firstname}</td>
                  <td>{booking.lastname}</td>
                  <td>{booking.address}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.email}</td>
                  <td>{new Date(booking.date).toLocaleString()}</td>
                  <td>{booking.roomtype}</td>
                  <td className="actionButtons">
                    <button onClick={() => deleteBooking(booking._id)}>
                      Delete <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link to={`/editbooking/` + booking._id}>
                      Edit <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
