import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "../../../styles/Rent/Adminbooking.css";
import R_Sidebar from "../../../components/Rent/R_Sidebar";

const RentalDetails = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const componentPDF = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts`);
        if (response.data.success) {
          setPosts(response.data.existingPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePDF = useReactToPrint({
    content: () => {
      const content = componentPDF.current;
      const clonedContent = content.cloneNode(true);
      // Create a new div for the title
      const titleDiv = document.createElement("div");
      titleDiv.style.textAlign = "center";
      titleDiv.style.marginBottom = "10px";
      titleDiv.style.marginRight = "50px";
      titleDiv.innerHTML = "<h1>Rental service booking details</h1>";
      clonedContent.insertBefore(titleDiv, clonedContent.firstChild); // Insert the title at the beginning

      // Create a new div for the sign text
      const signDiv = document.createElement("div");
      signDiv.style.position = "absolute";
      signDiv.style.bottom = "780px";
      signDiv.style.left = "60px";
      signDiv.innerText = "Sign .......";
      clonedContent.appendChild(signDiv); // Append the sign text at the end

      return clonedContent;
    },
    documentTitle: "Userdata",
    onAfterPrint: () => {
      alert("Data saved in PDF");
    },
  });

  const TableHeader = () => (
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
        <th>Price</th>
      </tr>
    </thead>
  );

  return (
    <div className="rent-bdth" style={{ width: "100%", textAlign: "center" }}>
      <R_Sidebar />
      <div className="rent-bdt">
        <h1 className="adb">Booking Details</h1>
        <input
          className="rent-searchb"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="rent-pdfbutt" onClick={generatePDF}>
          Get pdf
        </button>
        <div ref={componentPDF} style={{ alignContent: "center" }}>
          <table>
            <TableHeader />
            <tbody>
              {filteredPosts.map((post) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RentalDetails;
