import  { useState } from 'react';
import BackButton from '../../components/Ticket/BackButton';
import Spinner from '../../components/Ticket/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

//define the function
const DeleteTicketRecords = () => {

  // Define state variable using useState hook to manage loading state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { _id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteTicket = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3001/api/ticket/${_id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Ticket Deleted successfully', { variant: 'success' });
        navigate('/ticket');// Navigate to ticket page after successful deletion
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Ticket</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You  want to delete this ticket recoard?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteTicket} // Call handleDeleteTicket function when button is clicked
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteTicketRecords
