import { Button, Grid, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const E_register = ({addEmployee, updateEmployee, submitted, data, isEdit}) => {  // addemployee props 

  const [id,setId] = useState(0);
  const [name,setName] = useState('');
  const [role, setRole] = useState(0);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  useEffect(() => {
    if (!submitted){
      setId(0);
      setName('');
      setRole('');
    }
  },[submitted] );

  useEffect(() => {
    if (data && data.id && data.id !== 0){
      setId(data.id);
      setName(data.name);
      setRole(data.role);
    }
  }, [data]);

  return(
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: '#ffffff',
          marginBottom: '3px',
          display: 'block',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px',
          marginLeft: '-9px'
        }}
      >
        <Grid item xs={12}>
            <Typography component={'h1'} sx={{color: '#000000'}}></Typography>
        </Grid>

        <Grid item xs={12} sm={6} sx={{display:'flex'}}>
          <Typography 
              component={'label'} 
              htmlFor="id"
              sx={{
                color: '#000000',
                marginRight: '20px',
                fontSize: '16px',
                width: '100px',
                display:'block'
              }}
              >ID</Typography>
              <Input
                  type="number"
                  id="id"
                  name="id"
                  sx={{width: '400px'}}
                  value={id}
                  onChange={e => setId(e.target.value)} //declare a function
              />
        </Grid>

        <Grid item xs={12} sm={6} sx={{display:'flex'}}>
          <Typography 
              component={'label'} 
              htmlFor="id"
              sx={{
                color: '#000000',
                marginRight: '20px',
                fontSize: '16px',
                width: '100px',
                display:'block'
              }}
              >Name</Typography>
              <Input
                  type="text"
                  id="name"
                  name="name"
                  sx={{width: '400px'}}
                  value={name}
                  onChange={e => setName(e.target.value)} //declare a function
              />
        </Grid>

        <Grid item xs={12} sm={6} sx={{display:'flex'}}>
          <Typography 
              component={'label'} 
              htmlFor="id"
              sx={{
                color: '#000000',
                marginRight: '20px',
                fontSize: '16px',
                width: '100px',
                display:'block'
              }}
              >Role</Typography>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="role">Role</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="role"
                            name="role"
                            value={role}
                            label="Role"
                            onChange={handleChange}
                          >
                        <MenuItem value={10}>Staff</MenuItem>
                        <MenuItem value={20}>Tour Guide</MenuItem>
                      </Select>
                    </FormControl>
              
                    
            </Box>
            
              
        </Grid>

        <Button
            sx={{
              margin: 'auto',
              marginBottom: '20px',
              backgroundColor: '#00c6e6',
              color: '#000000',
              marginLeft: '15px',
              marginTop: '20px',
              '&:hover': {
                opacity: '0.7',
                backgroundColor: '00c6e6',
              }
            }}
            onClick={() => isEdit? addEmployee({id, name}) : addEmployee({id, name})}
        >

          {
          isEdit ? 'Update' : 'Add'}
        </Button>
      </Grid>
  );

}

export default E_register;