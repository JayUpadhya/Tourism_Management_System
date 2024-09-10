import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Package/P_dashboard.css';
import Psidebar from '../../components/Package/PSidebar';

const P_dashboard = () => {
    const [packages, setPackages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const retrievePackage = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/package');
                if (res.data.success) {
                    setPackages(res.data.existingPackage);
                }
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        };

        retrievePackage();
    }, []);

    const handleEdit = (packageItem) => {
        navigate(`/edit/${packageItem._id}`);
    };

    const handleDelete = async (packageItem) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/package/delete/${packageItem._id}`);
            if (response.data.message === "Delete Successful") {
                setPackages(packages.filter(item => item._id !== packageItem._id));
                alert("Package deleted successfully");
            } else {
                alert("Failed to delete package");
            }
        } catch (error) {
            console.error("Error deleting package:", error);
        }
    };

    const handleView = (packageItem) => {
        navigate(`/package/${packageItem._id}`); 
    };

    const filteredPackages = packages.filter(packageItem => {
        const query = searchQuery.toLowerCase();
        return (
            packageItem.pID.toLowerCase().includes(query) ||
            packageItem.province.toLowerCase().includes(query) ||
            packageItem.district.toLowerCase().includes(query) || // Include district in the search
            packageItem.packageName.toLowerCase().includes(query) ||
            packageItem.vehicle.toLowerCase().includes(query) ||
            packageItem.noOfPerson.toString().toLowerCase().includes(query) ||
            packageItem.places.toLowerCase().includes(query) ||
            (Array.isArray(packageItem.meals) ? packageItem.meals.join(', ').toLowerCase().includes(query) : packageItem.meals.toLowerCase().includes(query)) ||
            packageItem.activities.toLowerCase().includes(query) ||
            packageItem.accommodation.toLowerCase().includes(query) ||
            packageItem.price.toString().toLowerCase().includes(query)
        );
    });

    return (
        <div className='dash'>
            <Psidebar />
            <h4 className='p-title'>Tour Packages</h4>
            <div className="search-barp">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className='table-container1'>
                <table>
                    <thead>
                        <tr>
                            <th>PID</th>
                            <th>Province</th>
                            <th>District</th> {/* Add District column */}
                            <th>PName</th>
                            <th>Vehicle</th>
                            <th>NPersons</th>
                            <th>Places</th>
                            <th>Meals</th>
                            <th>Activities</th>
                            <th>Accommodation</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPackages.map(packageItem => (
                            <tr key={packageItem._id}>
                                <td>{packageItem.pID}</td>
                                <td>{packageItem.province}</td>
                                <td>{packageItem.district}</td> {/* Display district */}
                                <td>{packageItem.packageName}</td>
                                <td>{packageItem.vehicle}</td>
                                <td>{packageItem.noOfPerson}</td>
                                <td>{packageItem.places}</td>
                                <td>{packageItem.meals}</td>
                                <td>{packageItem.activities}</td>
                                <td>{packageItem.accommodation}</td>
                                <td>{packageItem.price}</td>
                                <td className="action-buttons">
                                    <button className="view" onClick={() => handleView(packageItem)}>
                                        <i className="fas fa-eye"></i>&nbsp; Read
                                    </button>
                                    <button className="edit" onClick={() => handleEdit(packageItem)}>
                                        <i className="fas fa-edit"></i>&nbsp; Update
                                    </button>
                                    <button className="delete" onClick={() => handleDelete(packageItem)}>
                                        <i className="fas fa-trash-alt"></i>&nbsp; Delete
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

export default P_dashboard;
