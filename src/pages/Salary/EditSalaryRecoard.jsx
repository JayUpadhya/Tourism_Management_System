import { useState, useEffect } from 'react';
import BackButton from '../../components/Salary/BackButton';
import Spinner from '../../components/Salary/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const EditSalaryRecoard = () => {
  const [s_id, setS_id] = useState('');
  const [name, setName] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [attendance, setAttendance] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { _id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/api/salary/${_id}`)
      .then((response) => {
        setS_id(response.data.s_id);
        setName(response.data.name);
        setBasicSalary(response.data.basicSalary);
        setAttendance(response.data.attendance);

        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])

  const handleEditSalary = () => {

    // Name validation
    if (!/^[A-Za-z\s]+$/.test(name)) {
      enqueueSnackbar('Please enter words only for Name', { variant: 'error' });
      return;
    }
    
    // Basic Salary validation
    if (!/^\d+$/.test(basicSalary)) {
      enqueueSnackbar('Please enter a valid number for Basic Salary', { variant: 'error' });
      return;
    }
    // Attendance validation
    if (!/^\d+$/.test(attendance) || parseInt(attendance) < 1 || parseInt(attendance) > 31) {
      enqueueSnackbar('Please enter a number between 1 and 31 for Attendance', { variant: 'error' });
      return;
    }
    const data = {
      s_id,
      name,
      basicSalary,
      attendance,

    };
    setLoading(true);
    axios
      .put(`http://localhost:3001/api/salary/${_id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Salary Edited successfully', { variant: 'success' });
        navigate('/salarys');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };


  return (
    <div className='bg-purple-200 min-h-screen'>
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center'>Edit Salary</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto bg-rose-100'>
      <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Salary ID</label>
          <input
            type='text'
            value={s_id}
            readOnly
       //     onChange={(e) => setS_id(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Basic Salary</label>
          <input
            type='text'
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Attendance</label>
          <input
            type='text'
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleEditSalary}>
          Save
        </button>
      </div>
    </div>
    </div>
  )
}


export default EditSalaryRecoard