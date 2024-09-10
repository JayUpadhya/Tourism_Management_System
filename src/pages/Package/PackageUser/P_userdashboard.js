import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../../styles/Package/P_userdashboard.css";
import PUSidebar from "../../../components/Package/PUSidebar";
import NavigationBar from "../../../components/NavigationBar3";

const P_userdashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveCustomizePackage = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/user");
        if (res.data.success) {
          setUsers(res.data.existingUser);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    retrieveCustomizePackage();
  }, []);

  const handleEdit = (packageUItem) => {
    navigate(`/editu/${packageUItem._id}`);
  };

  const handleDelete = async (packageUItem) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/user/delete/${packageUItem._id}`
      );
      if (response.data && response.data.message === "Delete Successful") {
        setUsers(users.filter((item) => item._id !== packageUItem._id));
        alert("Failed!");
      } else {
        alert("Customize Package deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting customize package:", error);
      alert(
        "Failed to delete customize package. Please check the console for more details."
      );
    }
  };

  // Function to handle buy button click
  const handleBuyButtonClick = () => {
    navigate("/"); // Navigate to 'payment' path
  };

  return (
    <div className="container">
      <div className="navBar">
        <NavigationBar />
      </div>
      <PUSidebar />
      <h2 className="cus-topic">Customize Packages</h2>
      <div className="flex-container8">
        {users.map((packageUItem) => (
          <div className="flex-item8" key={packageUItem._id}>
            <div>Province: {packageUItem.province}</div>
            <div>District: {packageUItem.district}</div>
            <div>
              Duration:{" "}
              {`${packageUItem.duration.start} - ${packageUItem.duration.end}`}
            </div>
            <div>No. of Persons: {packageUItem.noOfPerson}</div>
            <div>Vehicle: {packageUItem.vehicle}</div>
            <div>Places: {packageUItem.places}</div>
            <div>Meals: {packageUItem.meals}</div>
            <div>Activities: {packageUItem.activities}</div>
            <div>Accommodation: {packageUItem.accommodation}</div>
            <div>Price: {packageUItem.price}</div>
            <div className="action-buttons2">
              <button
                className="edit2"
                onClick={() => handleEdit(packageUItem)}
              >
                <i className="fas fa-edit"></i>&nbsp;
              </button>
              <button
                className="delete2"
                onClick={() => handleDelete(packageUItem)}
              >
                <i className="fas fa-trash-alt"></i>&nbsp;
              </button>
            </div>
            <Link to="/orderform">
              <button className="buy-button2" onClick={handleBuyButtonClick}>
                Buy
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default P_userdashboard;
