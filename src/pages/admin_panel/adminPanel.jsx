import React from "react";
import "../../styles/Booking/AdminPanel.css";
import { Link } from "react-router-dom";

import rooms from "../../images/Booking/Bedroom.png";
import events from "../../images/Booking/Party.png";

const adminPanel = () => {
  return (
    <div className="admin-bg">
      <div className="admin_panel">
        <Link to="/booking">
          <button className="hotelpanel">
            <img src={rooms} alt="rooms" className="hotelroom" />
          </button>
        </Link>
        <Link to="/eventbooking">
          <button className="eventpanel">
            <img src={events} alt="events" className="hotelroom" />
          </button>
        </Link>

        <p className="panel1">Hotel Panel</p>
        <p className="panel2">Event Panel</p>
      </div>
    </div>
  );
};

export default adminPanel;
