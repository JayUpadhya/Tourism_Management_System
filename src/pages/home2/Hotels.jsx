import React from "react";
import "../../styles/Booking/Hotels.css";
import { Link } from "react-router-dom";

import hotel1 from "../../images/Booking/hotel1.jpeg";
import hotel2 from "../../images/Booking/hotel2.jpeg";
import hotel3 from "../../images/Booking/hotel3.jpeg";
import NavigationBar from "../../components/NavigationBar3";

const Hotels = () => {
  return (
    <div className="hotel-booking-home">
      <div>
        <div>
          <NavigationBar></NavigationBar>
        </div>
        <p className="title">Modern Hotel Rooms</p>

        <div className="hotelsSet">
          <div className="hotels">
            <img src={hotel1} className="imageHotel" />
            <p id="roomIdNo1">Room001</p>
            <p className="priceTag">10000/=</p>
            <p className="count">4 Members</p>
            <Link to="/hotelform/Room001">
              <button className="bookButton">Booking</button>
            </Link>
          </div>

          <div className="hotels">
            <img src={hotel3} className="imageHotel" />
            <p id="roomIdNo2">Room002</p>
            <p className="priceTag">20000/=</p>
            <p className="count">2 Members</p>
            <Link to="/hotelform/Room002">
              <button className="bookButton">Booking</button>
            </Link>
          </div>

          <div className="hotels">
            <img src={hotel2} className="imageHotel" />
            <p id="roomIdNo3">Room003</p>
            <p className="priceTag">4599/=</p>
            <p className="count">1 Members</p>
            <Link to="/hotelform/Room003">
              <button className="bookButton">Booking</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
