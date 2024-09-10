import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../styles/Package/P_details.css'

const PackageDetails = () => {
  const [packageData, setPackageData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/package/${id}`);
        if (response.data.success) {
          setPackageData(response.data.package);
        } else {
          console.error('Error fetching package data:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching package:', error);
      }
    };

    fetchPackage();
  }, [id]);

  const { pID, province, packageName, vehicle, noOfPerson, places, meals, activities, accommodation, price } = packageData;

  return (
    <div className="package-details1">
      <div className='pedit'>
        <h3>Package Details</h3>
      </div>
      {Object.keys(packageData).length > 0 ? (
        <div className="flex-container2">
          <div className="flex-item2">
            <p><strong>PID:</strong> {pID}</p>
            <p><strong>Province:</strong> {province}</p>
            <p><strong>PName:</strong> {packageName}</p>
            <p><strong>Vehicle:</strong> {vehicle}</p>
            <p><strong>NPersons:</strong> {noOfPerson}</p>
            <p><strong>Places:</strong> {places}</p>
            <p><strong>Meals:</strong> {meals}</p>
            <p><strong>Activities:</strong> {activities}</p>
            <p><strong>Accommodation:</strong> {accommodation}</p>
            <p><strong>Price:</strong> {price}</p>
          </div>
        </div>
      ) : (
        <p>Loading package details...</p>
      )}
      <button className='detail-button2' onClick={() => navigate('/pdashboard')}>
        All Packages
      </button>
    </div>
  );
};

export default PackageDetails;
