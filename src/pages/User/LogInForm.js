import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../../styles/User/userlogin.css'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/users/login', formData);
            console.log(response.data); // Log the response data
            // Navigate to the home page upon successful login
            console.log("Navigating to home page...");
            navigate('/home');
        } catch (error) {
            console.error("Error occurred during login:", error);
            // Handle login error (display error message, clear form fields, etc.)
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='userlogin-body'>
            <div className='userlogin-container'>
                <h1>Login</h1>
                <form onSubmit={(event) => handleLogin(event)}>
                    <div className='userlogin-content'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className='userlogin-content'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                    </div>
                    <button type="submit">Login</button>
                    <div className='userlogin-signin'>
                        <p>Don't have an account?</p>
                        <a href='/userRegistration'>Create an Account</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;