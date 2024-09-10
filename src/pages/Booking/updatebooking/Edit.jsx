import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../styles/Booking/edit.css";
import axios from "axios";
import toast from "react-hot-toast";

const Edit = () => {
  // State Initialization and Parameter Retrieval
  // bookings : Initial state for booking data fields.
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

  // useParams(): React hook to retrieve parameters from the URL, in this case, the id.
  const { id } = useParams();

  // useNavigate(): Hook from React Router for navigation.
  const navigate = useNavigate();

  // useState(): Hook to initialize state, booking stores booking data retrieved from the API.
  const [booking, setBooking] = useState(bookings);

  // Input Change Handler
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    console.log(booking);
  };

  // useEffect(): React hook for handling side effects in function components. Here, it fetches booking data based on the id parameter when the component mounts or when id changes.
  useEffect(() => {
    // axios.get(): Fetches booking data from the specified API endpoint.
    axios
      .get(`http://localhost:3001/api/getone/${id}`)
      .then((response) => {
        //setBooking(): Updates the booking state with the received data.
        setBooking(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //
  const submitForm = async (e) => {
    // e.preventDefault(): Prevents the default form submission behavior.
    e.preventDefault();
    // axios.put(): Sends an HTTP PUT request to update the user data.
    await axios
      .put(`http://localhost:3001/api/update/${id}`, booking)
      .then((response) => {
        // toast.success(): Displays a success message using the react-hot-toast library upon successful data update.
        toast.success(response.data.msg, {
          position: "top-right",
          className: "alert",
        });
        // navigate("/"): Navigates back to the home page after a successful update
        navigate("/booking");
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

  // JSX Rendering the form
  return (
    <div className="booking-add">
      <div className="addBooking">
        <Link to={"/booking"} className="backHome">
          Back to Home
        </Link>
        <h3>Update Booking Details</h3>
        <form className="addBookingForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="roomid">Room Id</label>
            <select
              name="roomid"
              id="roomid"
              onChange={inputChangeHandler}
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

          <div className="inputGroup">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              onChange={inputChangeHandler}
              name="firstname"
              id="firstname"
              value={booking.firstname}
              placeholder="First name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              onChange={inputChangeHandler}
              name="lastname"
              id="lastname"
              value={booking.lastname}
              placeholder="Last name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              onChange={inputChangeHandler}
              name="address"
              id="address"
              value={booking.address}
              placeholder="Address"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              onChange={inputChangeHandler}
              name="phone"
              id="phone"
              value={booking.phone}
              placeholder="Phone Number"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={inputChangeHandler}
              name="email"
              id="email"
              value={booking.email}
              placeholder="Email address"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="date">Date of Booking</label>
            <input
              type="date"
              onChange={inputChangeHandler}
              name="date"
              id="date"
              value={booking.date ? formatDate(booking.date) : ""}
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
                onChange={inputChangeHandler}
                checked={booking.roomtype === "deluxe"}
              />
              <label className="roomt" htmlFor="deluxe">
                Deluxe
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="non_ac"
                name="roomtype"
                value="non_ac"
                onChange={inputChangeHandler}
                checked={booking.roomtype === "non_ac"}
              />
              <label className="roomt" htmlFor="non_ac">
                Non-AC
              </label>
            </div>
          </div>
          <div className="inputGroup">
            <button type="submit">Update Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
