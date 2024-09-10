import React from "react";
import "./footer.css";
import facebookImage from "../images/Destination/facebook.png";
import instaImage from "../images/Destination/instagram.png";
import twitterImage from "../images/Destination/x.png";
import tiktokImage from "../images/Destination/tiktok.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-section">
      <h1 className="logo">journyX</h1>

      <div className="four-section">
        <div className="info-section">
          <div className="decription">
            <p className="description-para">
              Explore the world with ease using our comprehensive Tourism
              Management System. Plan your adventures, book accommodations, and
              discover new destinations effortlessly. Your gateway to
              unforgettable journeys awaits!
            </p>
          </div>
          <div className="icons">
            <button className="icon-btn">
              <img src={facebookImage} width="35px" height="35px"></img>
            </button>
            <button className="icon-btn">
              <img src={instaImage} width="35px" height="35px"></img>
            </button>
            <button className="icon-btn">
              <img src={twitterImage} width="35px" height="35px"></img>
            </button>
            <button className="icon-btn">
              <img src={tiktokImage} width="35px" height="35px"></img>
            </button>
          </div>
          <section className="location">
            138/A, Kuruwita, Malaabe, Sri Lanka
          </section>
          <section className="contact">+94## #### ###</section>
        </div>

        <div className="about-section">
          <h2>About Us</h2>
          <ul>
            <li>text 1</li>
            <li>text 1</li>
            <li>text 1</li>
            <li>text 1</li>
            <li>text 1</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>Privacy Policy</h2>
          <ul>
            <li>text 1</li>
            <li>text 1</li>
            <li>text 1</li>
            <li>text 1</li>
            <li>text 1</li>
          </ul>
        </div>

        <div className="service-section">
          <Link to="faq">
            <h2>FAQs</h2>
          </Link>
          <Link to="/feedback">
            <h2>Feedback</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
