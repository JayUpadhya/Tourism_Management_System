import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../styles/Rent/A_checkvehicle.css";
import R_Sidebar from "../../../components/Rent/R_Sidebar";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate(); // Correctly import and use navigate

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:3001/vehicles");
        const data = await response.json();
        setVehicles(data.existingVehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:3001/vehicles");
      const data = await response.json();
      setVehicles(data.existingVehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/vehicle/delete/${id}`).then((res) => {
      if (res.data.message === "Delete successful") {
        alert("Deleted successfully");
        fetchVehicles();
      } else {
        console.error("Delete unsuccessful");
      }
    });
    console.log("Deleting vehicle with ID:", id);
  };

  return (
    <div className="rent-cvh">
      <R_Sidebar />
      <div className="rent-vhl">
        <h2>All Vehicles</h2>
        <table>
          <thead>
            <tr>
              <th>Vehicle Type</th>
              <th>Vehicle Number</th>
              <th>Owner Name</th>
              <th>Owner ID</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle._id}>
                <td>{vehicle.vehicleType}</td>
                <td>{vehicle.vehicleno}</td>
                <td>{vehicle.Owner}</td>
                <td>{vehicle.Ownerid}</td>
                <td>{vehicle.address}</td>
                <td>{vehicle.phone}</td>
                <td>
                  <button
                    className="rent-R_Bupdate"
                    onClick={() => navigate(`/A_updatevehicle/${vehicle._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="rent-R_Bdelete"
                    onClick={() => handleDelete(vehicle._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleList;
