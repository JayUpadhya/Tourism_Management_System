import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Booking/bookingHotelEvens.css";
import NavigationBar from "../../components/NavigationBar3";

export default function BookingHotelEvents() {
  return (
    <div className="blha">
      <h1>BookingHotelEvents</h1>
      <div className="blha-btn">
        <Link to="/hotels">
          <button>Hotels</button>
        </Link>
        <Link to="/events">
          <button>Event</button>
        </Link>
      </div>
    </div>
  );
}
