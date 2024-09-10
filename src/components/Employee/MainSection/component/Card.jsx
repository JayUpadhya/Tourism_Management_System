import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { axiosDelete } from "../../../../axiosServices";
import { toast } from "react-hot-toast";

const Card = ({ empData, handleEdit, handleReRender}) => {
  const { firstname, lastname, job, email, image, nic } = empData
  const [dropDown, setDropdown] = useState(false)

  const handleDelete = async(id) =>{

    try{
      const res = await axiosDelete(`/employee/${id}`)
      console.log(res)
      handleReRender()
      toast.success("Employee Deleted Successfully!", {
        duration: 4000,
        position:'top-right'
      });
    }
    catch(err){
      console.log(err)
      toast.error("Error cann't delete employee.please try again!", {
        duration: 4000,
        position:'top-right'
      });
    }
    
  }
  return (
    <div className="card-component">
      <div className="card-inner">
        <div className="dropdownContainer">
          <BsThreeDotsVertical size={20}  onClick={() => setDropdown(!dropDown)} />
          {
            dropDown && <ul className="dropdown"
              onMouseLeave={() => setDropdown(false)}
            >
              <li onClick={()=>handleEdit(empData._id)}>Update</li>
              <li onClick={()=>handleDelete(empData._id)}>Delete</li>
            </ul>
          }
        </div>
        {/* <div className="profileImage">
          <img
          src={image}
            alt={firstname}
          />
        </div> */}
        <div className="emp-detail">
          <h3>{firstname} {lastname}</h3>
          <p>{nic}</p>
          <p>{email}</p>
        </div>
      </div>
      <div className="job-role">
        <p>{job}</p>
      </div>
    </div>
  
  );
};

export default Card;
