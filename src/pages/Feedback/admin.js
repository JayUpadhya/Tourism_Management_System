import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./admin.css";

function AdminPanel() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/feedbacks`)
            .then((res) => {
                if (Array.isArray(res.data.response)) {
                    setUsers(res.data.response);
                    setDataList(res.data.response);
                } else {
                    console.error('Data received is not an array:', res.data);
                }
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);
    
    const generatePDF = () => {
        const doc = new jsPDF();
        const tableData = dataList.map(user => [user.name, user.email, user.travelguide, user.rating, user.feedback]);
        const headers = [['Name', 'Email', 'Travel Guide', 'Rating','Feedback']];
    
        doc.autoTable({
            head: headers,
            body: tableData,
        });
    
        doc.save('users.pdf');
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await Axios.post("http://localhost:3001/api/deletefeedback", { id });
            alert("Feedback deleted successfully");
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting feedback:", error);
            setLoading(false);
        }
    };
    
    const handleSearchArea = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        if (searchQuery === "") {
            setDataList(users);
        } else {
            const filteredUsers = users.filter(user => {
                return (
                    (user.name && user.name.toLowerCase().includes(searchQuery)) ||
                    (user.email && user.email.toLowerCase().includes(searchQuery)) ||
                    (user.travelguide && user.travelguide.toLowerCase().includes(searchQuery)) ||
                    (user.rating && user.rating.toString().includes(searchQuery)) ||
                    (user.feedback && user.feedback.includes(searchQuery))
                );
            });
            setDataList(filteredUsers);
        }
    };

    return (
        
        <div className="body1" style={{ minHeight: '100vh', position: 'relative' }}>
            <img src="https://cdn.pixabay.com/photo/2018/08/16/08/39/hallstatt-3609863_640.jpg" alt="Background" style={{ width: "100%", height: "100%", objectFit: "cover", position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
           
             <div style={{marginLeft:"41%",fontSize:"40px",fontWeight: "bold"}}>Feedback List</div>
  
            
            <div className="header">
                <nav>
                    {/* Your navigation buttons */}
                </nav>
            </div>
            <div className="row" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Search input */}
            </div>
            <br />
            <div className="table-container" style={{ width: "80%", margin: "0 auto", overflowX: "auto" }}>
                <table id="user-table" className="ads-table table table-hover" style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
                    <thead>
                        <tr>
                            <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>Name</th>
                            <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>Email</th>
                            <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>Travel Guide</th>
                            <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>Rating</th>
                            <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>Feedback</th>
                            <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList.map((feedback, index) => (
                            <tr key={index}>
                                <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{feedback.name}</td>
                                <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{feedback.email}</td>
                                <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{feedback.travelguide}</td>
                                <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{feedback.rating}</td>
                                <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{feedback.feedback}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(feedback.id)}
                                        className="delete-btn" 
                                        style={{
                                            backgroundColor: "#dc3545",
                                            color: "#fff",
                                            border: "none",
                                            padding: "6px 12px",
                                            borderRadius: "4px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="generate-pdf-btn" style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={generatePDF} className="btn btn-primary" style={{ marginLeft:"1100px",backgroundColor: "", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer" }}>Generate PDF</button>
            </div>
            <br /><br />
        </div>
    );
}

export default AdminPanel;
