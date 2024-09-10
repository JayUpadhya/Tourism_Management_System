import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Rent/R_Bdetails.css";
import NavigationBar from "../../components/NavigationBar3";

const RentalDetails = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { passportOrId } = useParams();
  const [bookingsWithTotalFee, setBookingsWithTotalFee] = useState([]);

  const rentalRates = {
    car: 7000,
    van: 9000,
    cab: 9000,
    tuktuk: 5000,
    bike: 3000,
  };

  useEffect(() => {
    fetchPosts();
  }, [passportOrId]);

  const fetchPosts = async () => {
    await axios.get("http://localhost:3001/posts").then((res) => {
      if (res.data.success) {
        const data = res.data.existingPosts;
        filterProduct(data, passportOrId);
        setPosts(data);
      }
    });
  };

  const filterProduct = (data, passportOrId) => {
    const filteredProduct = data.filter(
      (product) => product.passportOrId === passportOrId
    );

    const bookingsWithTotalFee = filteredProduct.map((booking) => {
      const { startDate, endDate, vehicleType } = booking;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const numberOfDays = (end - start) / (1000 * 60 * 60 * 24);
      const totalFee = rentalRates[vehicleType] * numberOfDays;
      return { ...booking, totalFee };
    });

    console.log(bookingsWithTotalFee);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/post/delete/${id}`).then((res) => {
      if (res.data.message === "Delete successful") {
        alert("Deleted successfully");
        fetchPosts();
      } else {
        console.error("Delete unsuccessful");
      }
    });
  };

  return (
    <div className="RentalDetails">
      <div className="navBar">
        <NavigationBar />
      </div>
      <h2>Booking details</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Vehicle Type</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Rental Duration</th>
              <th>Location</th>
              <th>Customer Name</th>
              <th>Passport/ID</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Total Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post.vehicleType}</td>
                <td>{post.vehicle}</td>
                <td>{post.driver ? "Yes" : "No"}</td>
                <td>{`${new Date(
                  post.rentalDate.startDate
                ).toLocaleDateString()} to ${new Date(
                  post.rentalDate.endDate
                ).toLocaleDateString()}`}</td>
                <td>{post.location}</td>
                <td>{post.customerName}</td>
                <td>{post.passportOrId}</td>
                <td>{post.address}</td>
                <td>{post.phone}</td>
                <td>{post.totalFee}</td>
                <td>
                  <button
                    className="bupdt"
                    onClick={() => navigate(`/R_Bupdate/${post._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="dlt"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                  <button className="paybtn">Pay now</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentalDetails;
