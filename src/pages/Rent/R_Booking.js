import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Rent/R_Booking.css";
import NavigationBar from "../../components/NavigationBar3";

const CarRentalForm = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [withDriver, setWithDriver] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [passportOrId, setPassportOrId] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [totalFee, setTotalFee] = useState(0);
  const rentalRates = {
    car: 7000,
    van: 9000,
    cab: 9000,
    tuktuk: 5000,
    bike: 3000,
  };
  const navigate = useNavigate();
  const calculateTotalFee = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const numberOfDays = (end - start) / (1000 * 60 * 60 * 24);
    const ratePerDay = rentalRates[vehicleType] || 0; // Use 0 as default rate if vehicle type is not found
    const total = ratePerDay * numberOfDays;
    setTotalFee(total);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    calculateTotalFee();
    // Validation
    if (
      !vehicleType ||
      !vehicle ||
      !startDate ||
      !endDate ||
      !pickupLocation ||
      !customerName ||
      !passportOrId ||
      !address ||
      !phoneNumber ||
      !totalFee
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (isNaN(phoneNumber)) {
      alert("Phone Number should be a number");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/post/save", {
        vehicleType,
        vehicle,
        driver: withDriver,
        rentalDate: { startDate, endDate },
        location: pickupLocation,
        customerName,
        passportOrId,
        address,
        phone: phoneNumber,
        totalFee,
      });

      if (response.data.success) {
        console.log("Data saved successfully");

        // navigate("/R_Bdetails");
        navigate(`/R_Bdetails/${passportOrId}`);
      } else {
        console.error("Failed to save data:", response.data.error);
      }
    } catch (error) {
      console.error("Failed to save data:", error.message);
    }
  };

  return (
    <div className="rent_bookingu">
      <div className="navBar">
        <NavigationBar />
      </div>
      <h2 className="rent_heading2">Rent a Vehicle Here!</h2>
      <form
        className="rent-formu"
        onSubmit={handleFormSubmit}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="rent-form-column">
          <div className="rent-Vtype">
            <label>
              Vehicle Type:
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="van">Van</option>
                <option value="cab">Cab</option>
                <option value="tuktuk">Tuk Tuk</option>
                <option value="Bike">Bike</option>
              </select>
            </label>
            <br />
            <label>
              Vehicle No(press vehicle details to check available vehicles):
              <input
                type="text"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value.slice(0, 8))}
                maxLength={8}
              />
            </label>
            <button
              className="rent-R_vehicle"
              onClick={() => navigate("/R_vehicle")}
            >
              Vehicle details
            </button>
            <br />
            <label>
              With Driver:
              <input
                type="checkbox"
                checked={withDriver}
                onChange={() => setWithDriver(!withDriver)}
              />
            </label>
            <br />
            <label>
              Duration:
              <div>
                <label>Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label>End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </label>
          </div>
        </div>
        <div className="rent-form-column">
          <label>
            Pickup Location:
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="">Select Pickup Location</option>
              <option value="airport">Airport</option>
              <option value="colombo">Colombo</option>
              <option value="galle">Galle</option>
              <option value="Kandy">Kandy</option>
              <option value="Ella">Ella</option>
              <option value="Anuradhapura">Anuradhapura</option>
              <option value="Nuwaraeliya">Nuwaraeliya</option>
            </select>
          </label>
          <br />
          <label>
            Customer Name:
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Passport or ID Number:
            <input
              type="text"
              value={passportOrId}
              onChange={(e) => setPassportOrId(e.target.value)}
            />
          </label>
          <br />
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <br />
          <label>
            Phone Number:
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d{0,15}$/.test(input)) {
                  setPhoneNumber(input);
                }
              }}
            />
          </label>
          <br />
          <button className="rent-resbutt" type="submit">
            Reserve
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarRentalForm;
