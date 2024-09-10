import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "../../../styles/Package/P_uinterface.css";
import PUSidebar from "../../../components/Package/PUSidebar";
import NavigationBar from "../../../components/NavigationBar3";
import { Link } from "react-router-dom";

const P_uinterface = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const retrievePackages = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/package");
        if (res.data.success) {
          setPackages(res.data.existingPackage);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    retrievePackages();
  }, []);

  // Function to handle buy button click
  const handleBuyButtonClick = () => {
    navigate("/"); // Navigate to 'payment' path
  };

  return (
    <div>
      <div className="navBar">
        <NavigationBar />
      </div>
      <PUSidebar />
      <h6 className="topic6">Tour Packages</h6>
      <div className="flex-container6">
        {packages.map((packageItem) => (
          <div key={packageItem._id} className="flex-item6">
            <h2 className="u-title">{packageItem.packageName}</h2>
            <div>Province: {packageItem.province}</div>
            <div>Vehicle: {packageItem.vehicle}</div>
            <div>No Person: {packageItem.noOfPerson}</div>
            <div>Places: {packageItem.places}</div>
            <div>Meals: {packageItem.meals}</div>
            <div>Activities: {packageItem.activities}</div>
            <div>Accommodation: {packageItem.accommodation}</div>
            <div>Price: {packageItem.price}</div>
            <Link to="/orderform">
              <button className="buy-button">Buy</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default P_uinterface;
