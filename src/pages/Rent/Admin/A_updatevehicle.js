import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../../styles/Rent/A_updatevehicle.css";

const A_updatevehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState({
    vehicleType: "",
    vehicleno: "",
    Owner: "",
    Ownerid: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/vehicle/${id}`);
        const data = response.data;
        setVehicle({
          vehicleType: data.vehicle.vehicleType,
          vehicleno: data.vehicle.vehicleno,
          Owner: data.vehicle.Owner,
          Ownerid: data.vehicle.Ownerid,
          address: data.vehicle.address,
          phone: data.vehicle.phone,
        });
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({
      ...vehicle,
      [name]: value,
    });
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
      alert("Please fill in all fields");
      return;
    }

    if (!/^\d{10}$/.test(vehicle.phone)) {
      alert("Phone Number should be a 10-digit number");
      return;
    }

    if (vehicle.vehicleno.length !== 8) {
      alert("Vehicle Number should be 8 characters long");
      return;
    }

    axios
      .put(`http://localhost:3001/vehicle/update/${id}`, vehicle)
      .then((res) => {
        if (res.data.success) {
          alert("Vehicle updated successfully");
          navigate("/A_checkvehicle");
        } else {
          console.error("Update unsuccessful");
        }
      });
  };

  return (
    <div className="rent_update22">
      <h2>Update Vehicle</h2>
      <form onSubmit={handleSubmit} className="rent-container23">
        <label>
          Vehicle Type:
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
        </label>
        <label>
          Owner Name:
          <input
            type="text"
            name="Owner"
            value={vehicle.Owner}
            onChange={handleChange}
          />
        </label>
        <label>
          Owner ID:
          <input
            type="text"
            name="Ownerid"
            value={vehicle.Ownerid}
            onChange={handleChange}
          />
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
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default A_updatevehicle;
