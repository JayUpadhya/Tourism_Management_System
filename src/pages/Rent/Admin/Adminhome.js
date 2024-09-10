import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Rent/Adminhome.css";

const ThreeButtonNav = () => {
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    const buttonMap = {
      "Check bookings": "/Adminbooking", // Use forward slashes for paths
      "Add vehicle": "/Addvehicle",
      "Check vehicle details": "/A_checkvehicle",
    };

    const targetPath = buttonMap[buttonName];

    if (targetPath) {
      navigate(targetPath);
    } else {
      console.warn(`Invalid button name: ${buttonName}`); // Handle invalid button clicks
    }
  };

  return (
    <div className="rent-button-container">
      <h1>Admin home</h1>

      <button onClick={() => handleButtonClick("Check bookings")}>
        Check bookings
      </button>
      <button onClick={() => handleButtonClick("Add vehicle")}>
        Add vehicle
      </button>
      <button onClick={() => handleButtonClick("Check vehicle details")}>
        Check vehicle details
      </button>
    </div>
  );
};

export default ThreeButtonNav;
