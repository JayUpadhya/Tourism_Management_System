import React, { useState } from "react";
import "./ModelPopup.css";
import { useFormik } from 'formik'
import { axiosPost } from "../../../axiosServices";
import { toast } from "react-hot-toast";
// import ImageUpload from "./ImageUpload";


// State to manage loading state
const ModelPopup = ({ setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  

  const handleGenderChange = (e) => {
    setGender(e.target.value); // Update gender state when the radio button changes
  };
  
  //const [imageURL, setImageURL] = useState('')
  //console.log(empById)

    // Declare a state variable for the selected image preview
    const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  
    // Function to handle file input change
    const handleImageChange = (e) => {
      const selectedFile = e.target.files[0];
      setSelectedImagePreview(URL.createObjectURL(selectedFile));
    };


  // Function to create employee
  const createEmployee = async (values) => {
    setLoading(true)
    try{
      
      const res = await axiosPost('/employee', values);
      console.log(res)
      setLoading(false)
      setShowModal(false)
      toast.success("Employee added Successfully!", {
        duration: 4000,
        position:'top-right'
      });
    }
    catch(err){
      console.log(err)
      toast.error("Error creating employee.please try again!", {
        duration: 4000,
        position:'top-right'
      });
    }
  }

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      job: '',
      dateofjoining: '',
      image:'',
      dateofbirth:'',
      age:'',
      gender:'',
      nic:'',
      password:'',
      confirmPassword:'',
    },
    
    

    // Form submission handler
    onSubmit: values => {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match!", {
          duration: 4000,
          position:'top-right'
        });
        return;
      }
      createEmployee(values)
    },
    
  })

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  

  return (
    <div className="modalContainer">
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="modalBox">
          <div className="modalHeader">
            <h2>New Employee Details</h2>
          </div>
          {/* <ImageUpload setImageURL={setImageURL}/> */}
          <div className="modalInner">
            <div className="input-container">
              <div className="input-box">
                <label htmlFor="">First Name</label>
                <input
                    type="text"
                    name="firstname"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
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
                <input
                    type="text"
                    name="lastname"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.selectedFile}
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
            {/* <div className="input-box">
              <label htmlFor="">image</label>
              <div className="input-container">
                <div className="input-box">
                    <input
                        type="file"
                        name="image"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleImageChange}
                        values={formik.values.image}
                      />
                  </div>
                  <div className="input-box">
                {selectedImagePreview && (
                  <img src={selectedImagePreview} alt="Selected Image" 
                  style={{ maxWidth: '75px', maxHeight: '75px' }}/>
                )}
                </div>
                </div>
            </div> */}

                      {/* <div className="input-box">
                        <label htmlFor="">image</label>
                        <input type="text" name="image"
                          required
                          onChange={formik.handleChange}
                          values={formik.values.image}
                        />
                      </div> */}


            <div className="input-container">
              <div className="input-box">
                <label htmlFor="">Email Address</label>
                <input
                  type="email"
                  name="email"
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
                  maxLength={10}
                  required
                  onKeyDown={(event) => {
                    const key = event.key;
                    if (!/[0-9]/.test(key) && key !== 'Backspace') {
                        event.preventDefault();
                    }
                }}
                
                  onChange={formik.handleChange}
                  values={formik.values.phone}
                />
              </div>
            

            </div>
            <div className="input-container">
            <div className="input-box">
              <label htmlFor="">Age</label>
              <input
                type="text"
                name="age"
                maxLength={2}
                required
                onChange={formik.handleChange}
                values={formik.values.age}
                onKeyDown={(event) => {
                  const key = event.key;
                  if (!/[0-9]/.test(key) && key !== 'Backspace') {
                      event.preventDefault();
                  }
              }}
              />
            </div>
            <div className="input-box">
              <label htmlFor="">Date of Birthday</label>
              <input
                type="date"
                name="dateofbirth"
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
              <button
                
                className="add-btn"
                type="submit"
              >
                {loading ? "Saving..." : "Save Details"}
                
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModelPopup;
