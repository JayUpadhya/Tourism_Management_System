import React, { useState } from 'react'
import { useFormik } from 'formik'
import "./ModelPopup.css";
import { axiosPut } from "../../../axiosServices";
import { toast } from "react-hot-toast";


// Function to handle editing employee details
const EditDetailsModal = ({ empById, setEditModal }) => {
    const { firstname, lastname, email, phone, job, dateofjoining, image, dateofbirth,gender,nic,password,confirmPassword,age } = empById
    //const date = new Date(dateofjoining)
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleEdit = async (values) => {
        setLoading(true)
        try {
            const res = await axiosPut(`/employee/${empById._id}`, values)
            setLoading(false)
            setEditModal(false)
            console.log(res)
            toast.success("Update Employee details Successfully!", {
                duration: 4000,
                position:'top-right'
              });

        }
        catch (err) {
            console.log(err)
            toast.error("Error : Cann't Update Employee Details.please try again!", {
                duration: 4000,
                position:'top-right'
              });
        }
    }

    // Formik form setup
    const formik = useFormik({
        initialValues: {
            firstname,
            lastname,
            email,
            phone,
            job,
            dateofjoining,
            image,
            dateofbirth,
            age,
            gender,
            nic,
            password,
            confirmPassword,
            
        },
        onSubmit: values => {if (values.password !== values.confirmPassword) {
            toast.error("Passwords do not match!", {
              duration: 4000,
              position:'top-right'
            });
            return;
          }
        handleEdit(values)

        }
    })

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
      };
    console.log(formik.initialValues)


    return (
        <div className="modalContainer">
            <form action="" onSubmit={formik.handleSubmit}>
                <div className="modalBox">
                    <div className="modalHeader">
                        <h2>New Employee Details</h2>
                    </div>
                    <div className="modalInner"

                    >
                        <div className="input-container">
                            <div className="input-box">
                                <label htmlFor="">First Name</label>
                                <input 
                                    type="text"  
                                    name="firstname"
                                    required
                                    defaultValue={firstname}
                                    onChange={formik.handleChange}
                                    values={formik.values.firstname}
                                    onKeyDown={(e) => {
                                        const key = e.key;
                                        // Allow only alphabetic characters (A-Z, a-z) and space (32)
                                        if (
                                          (key < 'A' || key > 'Z') &&
                                          (key < 'a' || key > 'z') &&
                                          key !== ' '
                                        ) {
                                          e.preventDefault(); // Prevent input of numbers and special characters
                                        }
                                      }}
                                />
                            </div>
                            <div className="input-box">
                                <label htmlFor="">Last Name</label>
                                <input type="text" name="lastname"
                                    required
                                    defaultValue={lastname}
                                    onChange={formik.handleChange}
                                    values={formik.values.lastname}
                                    onKeyDown={(e) => {
                                        const key = e.key;
                                        // Allow only alphabetic characters (A-Z, a-z) and space (32)
                                        if (
                                          (key < 'A' || key > 'Z') &&
                                          (key < 'a' || key > 'z') &&
                                          key !== ' '
                                        ) {
                                          e.preventDefault(); // Prevent input of numbers and special characters
                                        }
                                      }}
                                />
                            </div>
                        </div>
                        

                        <div className="input-container">
                            <div className="input-box">
                                <label htmlFor="">Email Address</label>
                                <input
                                type="email"
                                name="email"
                                defaultValue={email}
                                required
                                onChange={formik.handleChange}
                                values={formik.values.email}
                                />
                            </div>
                            <div className="input-box">
                                <label htmlFor="">NIC</label>
                                <input
                                type="text"
                                name="nic"
                                defaultValue={nic}
                                required
                                onChange={formik.handleChange}
                                values={formik.values.nic}
                                />
                            </div>
                
                        </div>
                        <div className="input-container">
                            <div className="input-box">
                                <label htmlFor="">Job-position</label>
                                <input
                                type="text"
                                name="job"
                                defaultValue={job}
                                required
                                onChange={formik.handleChange}
                                values={formik.values.job}
                                />
                            </div>
                            <div className="input-box">
                                <label htmlFor="">Phone</label>
                                <input
                                type="text"
                                name="phone"
                                defaultValue={phone}
                                required
                                pattern="[0-9]*"
                                onChange={formik.handleChange}
                                values={formik.values.phone}
                                onKeyDown={(e) => {
                                    const key = e.key;
                                    // Allow only numeric characters (0-9)
                                    if((key < '0' || key > '9') && key !== '')
                                    {
                                    e.preventDefault(); // Prevent input of non-numeric characters
                                    }
                                }}
                                />
                            </div>
                            

                            </div>
                            <div className="input-container">
                                <div className="input-box">
                                <label htmlFor="">Age</label>
                                <input
                                    type="text"
                                    name="age"
                                    defaultValue={age}
                                    required
                                    onChange={formik.handleChange}
                                    values={formik.values.age}
                                    onKeyDown={(e) => {
                                    const key = e.key;
                                    // Allow only numeric characters (0-9)
                                    if((key < '0' || key > '9') && key !== ' ')
                                    {
                                        e.preventDefault(); // Prevent input of non-numeric characters
                                    }
                                    }}
                                />
                                </div>
                                <div className="input-box">
                                <label htmlFor="">Date of Birthday</label>
                                <input
                                    type="date"
                                    name="dateofbirth"
                                    defaultValue={dateofbirth}
                                    required
                                    onChange={formik.handleChange}
                                    values={formik.values.dateofbirth}
                                />
                                </div>

                                </div>
                                <div className="input-container">
                                    <div className="gender">
                                    <label htmlFor="">Gender</label>
                                    <select
                                            name="gender"
                                            defaultValue={gender}
                                            values={formik.values.gender}
                                            onChange={formik.handleChange}
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                    </select>
                                    
                                    </div>

                                    <div className="input-box">
                                    <label htmlFor="">Date of Joining</label>
                                    <input
                                        type="date"
                                        name="dateofjoining"
                                        defaultValue={dateofjoining}
                                        required
                                        onChange={formik.handleChange}
                                        values={formik.values.dateofjoining}
                                    />
                                    </div>

                                    </div>
                                    <div className="input-container">
                                        <div className="input-box">
                                        <label htmlFor="">Password</label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            
                                            required
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                        />
                                        <span
                                            className={`password-toggle ${showPassword ? "visible" : ""}`}
                                            onClick={togglePasswordVisibility}
                                            >
                                            {showPassword ? "Hide" : "Show"}
                                            </span>
                                        </div>
                                        <div className="input-box">
                                        <label htmlFor="">Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            
                                            required
                                            onChange={formik.handleChange}
                                            value={formik.values.confirmPassword}
                                        />
                                        
                                        </div>
                                        </div>
                    
                    <div className="modalFooter">
                        <button  className="add-btn" type="submit">{loading ? 'Editing' : 'Edit and Save'}</button>
                    </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditDetailsModal;