import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/Rent/R_Bupdate.css";
import NavigationBar from "../../components/NavigationBar3";
const R_Update = () => {
  const [post, setPost] = useState(null);
  const [vehicleType, setVehicleType] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [withDriver, setWithDriver] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [passportOrId, setPassportOrId] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/post/${id}`);
        setPost(response.data.post);

        setVehicleType(response.data.post.vehicleType);
        setVehicle(response.data.post.vehicle);
        setWithDriver(response.data.post.driver);
        setStartDate(response.data.post.rentalDate.startDate);
        setEndDate(response.data.post.rentalDate.endDate);
        setPickupLocation(response.data.post.location);
        setCustomerName(response.data.post.customerName);
        setPassportOrId(response.data.post.passportOrId);
        setAddress(response.data.post.address);
        setPhone(response.data.post.phone);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const editedPost = {
      vehicleType,
      vehicle,
      driver: withDriver,
      rentalDate: { startDate, endDate },
      location: pickupLocation,
      customerName,
      passportOrId,
      address,
      phone,
    };

    try {
      const response = await axios.put(
        `http://localhost:3001/post/update/${id}`,
        editedPost
      );
      console.log("Post updated successfully:", response.data);
      window.location.href = "/R_Bdetails/passportOrId";
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="R_updt">
      <div className="navBar">
        <NavigationBar />
      </div>
      <h2>Edit Your Reservation</h2>
      <div className="R_updt2">
        <form onSubmit={handleEdit} className="updatefrm">
          <label>
            Vehicle Type:
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="car">Sedan</option>
              <option value="van">Van</option>
              <option value="cab">Cab</option>
              <option value="tuktuk">tuktuk</option>
              <option value="Bike">bike</option>
            </select>
          </label>
          <label>
            Vehicle:
            <input
              type="text"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            />
          </label>
          <label>
            Driver:
            <input
              type="checkbox"
              checked={withDriver}
              onChange={() => setWithDriver(!withDriver)}
            />
          </label>
          <label>
            Rental Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            Rental End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <label>
            Pickup Location:
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
          </label>
          <label>
            Customer Name:
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </label>
          <label>
            Passport/ID:
            <input
              type="text"
              value={passportOrId}
              onChange={(e) => setPassportOrId(e.target.value)}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default R_Update;
