import React, { useState } from 'react';
import LeftBar from './LeftNav/LeftBar';
import MainSection from './MainSection/MainSection';
import Navbar from './Navbar';

const Dashboard = () => {
     const [employeeId, setEmployeeId] = useState('');
  console.log(employeeId);  
  return (
    <div>
        <Navbar/>
        <LeftBar employeeId={employeeId} />
        <MainSection setEmployeeId={setEmployeeId} />
    </div>
  )
}


export default Dashboard;