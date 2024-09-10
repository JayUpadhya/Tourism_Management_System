import React from "react";
import "../../styles/Booking/Events.css";
import { Link } from "react-router-dom";

import balloon from "../../images/Booking/hotbaloon.jpeg";
import surfing from "../../images/Booking/surf.jpeg";
import train from "../../images/Booking/train.jpg";
import bird from "../../images/Booking/bird.jpeg";
import safari from "../../images/Booking/safari.jpeg";
import hiking from "../../images/Booking/hiking.jpeg";
import NavigationBar3 from "../../components/NavigationBar3";

const Events = () => {
  return (
    <div className="event-bl">
      <div>
        <div>
          <NavigationBar3 />
        </div>
        <p className="title">Fun and thrilling events to do in Sri Lanka</p>

        <div className="eventsSet">
          <div className="events">
            <img src={balloon} className="imageEvent" />
            <p id="event1">HOT AIR BALLOONING</p>
            <p className="tags">ADVENTURE | FLY | NATURE</p>
            <Link to="/eventform/Event001">
              <button className="bookButton">Booking</button>
            </Link>
          </div>

          <div className="events">
            <img src={surfing} className="imageEvent" />
            <p id="event2">SURFING</p>
            <p className="tags">ADVENTURE | WATERSPORTS | BEACH</p>
            <Link to="/eventform/Event002">
              <button className="bookButton">Booking</button>
            </Link>
          </div>

          <div className="events">
            <img src={train} className="imageEvent" />
            <p id="event3">TRAIN TOURS</p>
            <p className="tags">SCENIC | NATURE | TRAIN</p>
            <Link to="/eventform/Event003">
              <button className="bookButton">Booking</button>
            </Link>
          </div>

          <br />

          <div className="events">
            <img src={bird} className="imageEvent" />
            <p id="event1">BIRD WATCHING</p>
            <p className="tags">WILDLIFE | BIRDS | NATURE</p>
            <Link to="/eventform/Event004">
              <button className="bookButton">Booking</button>
            </Link>
          </div>

          <div className="events">
            <img src={safari} className="imageEvent" />
            <p id="event2">WILD SAFARIES</p>
            <p className="tags">WILDLIFE | ELEPHANTS | NATURE</p>
            <Link to="/eventform/Event005">
              <button className="bookButton">Booking</button>
            </Link>
          </div>

          <div className="events">
            <img src={hiking} className="imageEvent" />
            <p id="event3">HIKING</p>
            <p className="tags">TREKKING | HIKING | NATURE</p>
            <Link to="/eventform/Event006">
              <button className="bookButton">Booking</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
