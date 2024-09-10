import React, { useState, useEffect } from "react";




const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  

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

  return (
    <div>
      <h2>Available Vehicles</h2>
      <table>
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Vehicle Number</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.vehicleType}</td>
              <td>{vehicle.vehicleno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;
