import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ userEmail }) => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/users/details/${userEmail}`);
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        if (userEmail) {
            fetchUserDetails();
        }
    }, [userEmail]);

    return (
        <div>
            <h2>User Profile</h2>
            {userDetails ? (
                <div>
                    <p><strong>First Name:</strong> {userDetails.firstName}</p>
                    <p><strong>Last Name:</strong> {userDetails.lastName}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    {/* Display other user details as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
