import React, { useEffect, useState } from 'react'
import './LeftBar.css'
import { axiosGet } from '../../../axiosServices'

const LeftBar = ({ employeeId }) => {
  const [empById, setEmpById] = useState([])


  const getEmployeeById = async () => {
    try {
      const res = await axiosGet(`/employee/${employeeId}`)
      setEmpById(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getEmployeeById()
  }, [employeeId])

  return (
    <nav className='leftNav'>
        <div className='logo'>
          <h1> JournyX</h1>
        </div>
      <div className="employeeDetail">
        <div className='emp'>
        <h1>Employee Details</h1>
        </div>
        <div className='empdis'>
          {/* <img src={empById.image}/> */}
        <h1>Full Name - {empById.firstname} {empById.lastname}</h1>
        <p>NIC - {empById.nic}</p>
        <p>Email - {empById.email}</p>
        <p>Phone No - {empById.phone}</p>
        <p>Age - {empById.age}</p>
        <div>
        <p> Date of Birthday - {empById.dateofbirth}</p>
        </div>
        <p>Gender - {empById.gender}</p>
        
        
        <p className='job'>Job Role : {empById.job}</p>
        <p className='date'>Join Date - {empById.dateofjoining}</p>
        <p className='password'>Password - {empById.password}</p>

        </div>
        
      </div>
    </nav>
  )
}

export default LeftBar;
