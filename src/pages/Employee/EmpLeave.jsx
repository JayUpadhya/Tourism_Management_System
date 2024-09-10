import React, { useState } from 'react';
import '../../styles/Employee/EmpLeave.css'
import axios from 'axios';
import Navbar from '../../components/Employee/Navbar';

const EmpLeave = () => {
     const [leaveType, setLeaveType] = useState('');
     const [startDate, setStartDate] = useState('');
     const [endDate, setEndDate] = useState('');
     const [reason, setReason] = useState('');

     

     

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.post('/', {
                    leaveType,
                    startDate,
                    endDate,
                    reason
               });
               console.log(response.data); // handle the response data as needed
          } catch (error) {
               console.error(error); // handle the error as needed
          }
     };

     return (
          
          <div className='leave'> 
               
               <h1>Employee Leave Form</h1>
               <form onSubmit={handleSubmit}>
                    <label>
                         Leave Type:
                         <input
                              type="text"
                              value={leaveType}
                              onChange={(e) => setLeaveType(e.target.value)}
                              
                         />
                    </label>
                    <br />
                    <label>
                         Start Date:
                         <input
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                         />
                    </label>
                    <br />
                    <label>
                         End Date:
                         <input
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                         />
                    </label>
                    <br />
                    <label>
                         Reason:
                         <textarea
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                         />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
               </form>
          </div>
     );
};

export default EmpLeave;