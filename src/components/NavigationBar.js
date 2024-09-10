import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <div className="nav-bar">
      <div className="left-section">
        <h1 className="logo">journyX</h1>
      </div>

      <div className="middle-section">
        <Link to="/">
          <button className="btn">Home</button>
        </Link>

        <Link to="/pintfc">
          <button className="btn">Packages</button>
        </Link>

        <Link to="/attractions">
          <button className="btn">Attractions</button>
        </Link>

        <Link to="/R_Booking">
          <button className="btn">Vehical Rental</button>
        </Link>

        <Link to="/booking&event">
          <button className="btn">Booking</button>
        </Link>

        <Link to="/faq">
          <button className="btn">Contact</button>
        </Link>
      </div>

      <div className="right-section">
        <Link to="login">
          <button className="btn">LogIn</button>
        </Link>
        <Link to="userRegistration">
          <button className="btn">SignUp</button>
        </Link>
      </div>
    </div>
  );
}
