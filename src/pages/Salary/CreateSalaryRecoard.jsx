import React, { useState } from 'react';
import BackButton from '../../components/Salary/BackButton';
import Spinner from '../../components/Salary/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateSalaryRecord = () => {
  const [dic, setDic] = useState('');
  const [nic, setNic] = useState('');
  const [name, setName] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [attendance, setAttendance] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const validateNic = (nic) => {
    // Matches NIC numbers for both pre- and post-2000
    const oldNicPattern = /^[0-9]{9}[vVxX]$/;
    const newNicPattern = /^[0-9]{12}$/;
    return oldNicPattern.test(nic) || newNicPattern.test(nic);
  };

  const handleSaveSalary = () => {

    if (!/^[A-Za-z\s]+$/.test(dic)) {
      enqueueSnackbar('Please enter letters only for Name', { variant: 'error' });
      return;
    }
  

    if (!validateNic(nic)) {
      enqueueSnackbar('Please enter a valid NIC (9 digits followed by "v" or "x", or 12 digits)', { variant: 'error' });
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      enqueueSnackbar('Please enter letters only for Name', { variant: 'error' });
      return;
    }

    if (!/^\d+$/.test(basicSalary)) {
      enqueueSnackbar('Please enter a valid number for Basic Salary', { variant: 'error' });
      return;
    }

    if (!/^\d+$/.test(attendance) || parseInt(attendance) < 1 || parseInt(attendance) > 31) {
      enqueueSnackbar('Please enter a number between 1 and 31 for Attendance', { variant: 'error' });
      return;
    }

    const data = {
      dic,
      nic,
      name,
      basicSalary,
      attendance,
    };

    setLoading(true);
    axios
      .post('http://localhost:3001/api/salary', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Salary Created successfully', { variant: 'success' });
        navigate('/salarys');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        enqueueSnackbar('Failed to create salary', { variant: 'error' });
      });
  };
   
  
  const handleDicChange = (e) => {
    const inputDic = e.target.value.replace(/[^A-Za-z\s]/g, '');
    setDic(inputDic);
  };

  const handleNicChange = (e) => {
    const inputNic = e.target.value.replace(/[^0-9vVxX]/g, '');
    if (/^[0-9]{9}[vVxX]?$/i.test(inputNic) || /^[0-9]{0,12}$/.test(inputNic)) {
      setNic(inputNic);
    }
  };

  const handleNameChange = (e) => {
    const inputName = e.target.value.replace(/[^A-Za-z\s]/g, '');
    setName(inputName);
  };

  return (
    <div className='bg-purple-200 min-h-screen'>
      <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4 text-center'>Create Salary</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto bg-rose-100'>

        <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>DIC</label>
            <input
              type='text'
              value={dic}
              onChange={handleDicChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>NIC</label>
            <input
              type='text'
              value={nic}
              onChange={handleNicChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
              placeholder='123456789V or 200012345678'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Name</label>
            <input
              type='text'
              value={name}
              onChange={handleNameChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Basic Salary(Rs.)</label>
            <input
              type='text'
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Attendance</label>
            <input
              type='text'
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <button className='p-2 bg-sky-300 m-8' onClick={handleSaveSalary}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSalaryRecord;
