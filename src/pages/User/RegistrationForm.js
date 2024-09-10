import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../../styles/User/registration.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        passportNumber: '',
        phoneNumber: '',
        country: '',
        gender: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Initialize navigate function

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Reset errors when user starts typing
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleRegister = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const validationErrors = {};

        // Validation
        for (const key in formData) {
            if (!formData[key]) {
                validationErrors[key] = 'Please fill in this field.';
            }
        }

        if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
            validationErrors.firstName = 'Please enter a valid first name (only alphabets).';
        }

        if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
            validationErrors.lastName = 'Please enter a valid last name (only alphabets).';
        }

        if (!/^\d+$/.test(formData.phoneNumber)) {
            validationErrors.phoneNumber = 'Please enter a valid phone number (only digits).';
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Please enter a valid email address.';
        }

        if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(formData.password)) {
            validationErrors.password = 'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/users/register', formData);
            console.log(response.data); // Log the response data

            // After successful registration, navigate to the home page
            console.log("Navigating to home page...");
            navigate('/home'); // Assuming the home page URL is '/'
        } catch (error) {
            // Error handling code remains the same
        }
    };

    return (
        <div className='userregistration-body'>
            <div className='userregistration-container'>
                <h2>Register</h2>
                <form onSubmit={(event) => handleRegister(event)} className='regForm'>

                    <div className='userregistration-content'>
                        <div className='userregistration-row'>
                            <div className='userregistration-column'>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} />
                                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                            </div>
                            <div className='userregistration-column'>
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
                                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                            </div>
                        </div>
                    </div>

                    <div className='userregistration-content'>
                        <div className='userregistration-row'>
                            <div className='userregistration-column'>
                                <label htmlFor="passportNumber">Passport Number</label>
                                <input type="text" id="passportNumber" name="passportNumber" placeholder="Enter your passport number" value={formData.passportNumber} onChange={handleChange} />
                            </div>
                            <div className='userregistration-column'>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" value={formData.phoneNumber} onChange={handleChange} />
                                {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                            </div>
                        </div>
                    </div>

                    <div className='userregistration-content'>
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                    </div>
                    
                    <div className='userregistration-content'>
                        <div className='userregistration-row'>
                            <div className='userregistration-column'>
                                <label htmlFor="country">Country</label>
                                <select id="country" name="country" value={formData.country} onChange={handleChange}>
                                    <option value="">Select Country</option>
                                    <option value="srilanka">Sri Lanka</option>
                                </select>
                            </div>
                            <div className='userregistration-column'>
                                <label htmlFor="gender">Gender</label>
                                <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>                
                    
                    <div className='userregistration-content'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    <div className='userregistration-content'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>

                    <button type="submit">Register</button>

                    <div className='userregistration-signin'>
                        <p>Already have an account?</p>
                        <a href='/userLogin'>SignUp</a>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
