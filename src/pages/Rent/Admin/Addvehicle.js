import React, { useState } from "react";
import axios from "axios";
import "../../../styles/Rent/Addvehicle.css";
import R_Sidebar from "../../../components/Rent/R_Sidebar";

const AddVehicleForm = () => {
  const [vehicle, setVehicle] = useState({
    vehicleType: "",
    vehicleno: "",
    Owner: "",
    Ownerid: "",
    address: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({
    vehicleno: "",
    phone: "",
    Owner: "",
    Ownerid: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "vehicleno") {
      if (!/^(\d{0,7}|[A-Za-z]+\d*)$/.test(value)) {
        errorMessage = "Invalid vehicle number format";
      }
      if (!/^\d{0,7}[A-Za-z]{0,3}\d{0,4}$/.test(value)) {
        errorMessage = "Invalid vehicle number format";
      }
      if (!/^\d{0,7}[A-Za-z]{0,3}\d{0,4}$/.test(value)) {
        errorMessage = "Invalid vehicle number format";
      }
    } else if (name === "phone" && (isNaN(value) || value.length > 10)) {
      errorMessage = "Invalid phone number format";
    } else if (name === "Owner") {
      if (!/^[A-Za-z ]+$/.test(value)) {
        errorMessage = "Invalid owner name format";
      }
    } else if (
      (name === "Ownerid" && /^\d{9}v$/.test(value)) ||
      /^\d{13}$/.test(value)
    ) {
      errorMessage = "Invalid owner ID format";
    }

    setFormErrors((prevState) => ({
      ...prevState,
      [name]: errorMessage,
    }));

    if (!errorMessage) {
      setVehicle({
        ...vehicle,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !vehicle.vehicleType ||
      !vehicle.vehicleno ||
      !vehicle.Owner ||
      !vehicle.Ownerid ||
      !vehicle.address ||
      !vehicle.phone
    ) {
      alert("Please fill in all fields.");
      return;
    }

    axios.post("http://localhost:3001/vehicle/save", vehicle).then((res) => {
      if (res.data.success) {
        alert("Vehicle added successfully");

        // Clear form after successful submission
        setVehicle({
          vehicleType: "",
          vehicleno: "",
          Owner: "",
          Ownerid: "",
          address: "",
          phone: "",
        });
      } else {
        console.error("Add vehicle unsuccessful");
      }
    });
  };

  return (
    <div className="rent-addv">
      <R_Sidebar />
      <div className="rent-cont">
        <h2>Add Vehicle</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Vehicle Model:
            <input
              type="text"
              name="vehicleType"
              value={vehicle.vehicleType}
              onChange={handleChange}
            />
          </label>
          <label>
            Vehicle Number:
            <input
              type="text"
              name="vehicleno"
              value={vehicle.vehicleno}
              onChange={handleChange}
            />
            <p>{formErrors.vehicleno}</p>
          </label>
          <label>
            Owner Name:
            <input
              type="text"
              name="Owner"
              value={vehicle.Owner}
              onChange={handleChange}
            />
            <p>{formErrors.Owner}</p>
          </label>
          <label>
            Owner ID:
            <input
              type="text"
              name="Ownerid"
              value={vehicle.Ownerid}
              onChange={handleChange}
            />
            <p>{formErrors.Ownerid}</p>
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={vehicle.address}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phone"
              value={vehicle.phone}
              onChange={handleChange}
            />
            <p>{formErrors.phone}</p>
          </label>
          <button className="rent-adbtn" type="submit">
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleForm;
