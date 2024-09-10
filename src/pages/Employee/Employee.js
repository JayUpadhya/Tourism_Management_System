import { Box } from "@mui/material";
import E_register from "./E_register";
import E_table from "./E_table";
import Axios from "axios";
import {useEffect, useState} from "react";
import Navbar from "../../components/Employee/Navbar";



const Employee = () =>{  

  const [employee, setEmployee] = useState([]);
  const [submitted, setsubmitted] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const[isEdit , setIsEdit] = useState(false);

  

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = () => {
    Axios.get('http://localhost:3001/api/employee')
      .then(response => {
          setEmployee(response.data?.response || []);
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      })
  }

  const addEmployee = (data) => {
    setsubmitted(true);
    
    const payload = {
      id : data.id,
      name : data.name,
      role : data.role,
    }

    Axios.post('http://localhost:3001/api/createemployee', payload)
    .then(response => {
      getEmployee();
      setsubmitted(false);
      isEdit(false);
    })
    .catch(error => {
      console.error("Axios Error : ", error);
    });
  }

  const updateEmployee = (data) => {
    setsubmitted(true);

    const payload = {
      id : data.id,
      name : data.name,
      role : data.role,
    }

    Axios.post('http://localhost:3001/api/updateemployee', payload)
    .then(response => {
      getEmployee();
      setsubmitted(false);
      isEdit(false);

    })
    .catch(error => {
      console.error("Axios Error : ", error);
    });

  }

  const deleteEmployee = (data) => {
    Axios.post('http://localhost:3001/api/deleteemployee', data)
    .then(() => {
      getEmployee();

    })
    .catch(error => {
      console.error("Axios Error : ", error);
    });

  }

    return(
        
      <div>
        <Navbar />
          <Box
          sx={{
            width: 'calc(100% - 100px)',
            margin : 'auto',
            marginTop : '100px',
            backgroundColor: '#f0f0f0',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h1 style={{textAlign: 'center', marginBottom:'30px'}}>Employee Details</h1>
          <E_register 
            addEmployee={addEmployee}
            updateEmployee={updateEmployee}
            submitted={submitted}
            data = {selectedEmployee}
            isEdit={isEdit}
          />
          

          <E_table
            rows={employee}
            selectedEmployee = {data => {
               setSelectedEmployee(data);
              setIsEdit(true);
            }}
            deleteEmployee={data => window.confirm('Are you sure?') && deleteEmployee(data)}
           /> 

        </Box>
      </div>
        

    );
}

export default Employee;