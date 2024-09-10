import { useState, useEffect } from 'react';
import BackButton from '../../components/Ticket/BackButton';
import Spinner from '../../components/Ticket/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import seaImage from '../../images/Ticket/sea.jpg';

//define function
const EditTicketRecords = () => {

  // Define state variables using useState hook to manage form inputs and loading state
  const [t_id, sett_id] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [issueType, setIssueType] = useState('');
  const [issue, setIssue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { _id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);

    // Fetch ticket details from server when component mounts
    axios.get(`http://localhost:3001/api/ticket/${_id}`)
      .then((response) => {
        sett_id(response.data.t_id);
        setName(response.data.name);
        setEmail(response.data.email);
        setIssueType(response.data.issueType);
        setIssue(response.data.issue);

        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  }, [])

  const handleEditTicket = () => {

    // Name validation
    if (!/^[A-Za-z\s]+$/.test(name)) {
      enqueueSnackbar('Please enter letters only for Name', { variant: 'error' });
      return;
    }
    
    
    // Email validation
if (!/\S+@\S+\.\S+/.test(email)) {
    enqueueSnackbar('Please enter a valid email address', { variant: 'error' });
    return;
  }
  
    // IssueType validation
    if (!/^[A-Za-z\s]+$/.test(issueType)) {
        enqueueSnackbar('Please enter letters only for Issue Type', { variant: 'error' });
        return;
      }

      // Issue validation
      if (!/^[A-Za-z\s]+$/.test(issue)) {
        enqueueSnackbar('Please enter letters only for Issue', { variant: 'error' });
        return;
      }

      // Create data object with form input values
    const data = {
      t_id,
      name,
      email,
      issueType,
      issue,

    };
    setLoading(true);
    axios
      .put(`http://localhost:3001/api/ticket/${_id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Ticket Edited successfully', { variant: 'success' });
        navigate('/ticket');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Check console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };


  return (
    <div className='p-4' style={{ backgroundImage: `url(${seaImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <BackButton />
      <h1 className='text-3xl my-4 text-center' style={{ fontWeight: 'bold' }}>Edit Ticket</h1> {/* Apply bold font style */}
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <div className='my-4'>
          <label className='text-xl mr-4 text-black-500'>Ticket ID</label>
          <input
            type='text'
            value={_id}
            readOnly
       //     onChange={(e) => setS_id(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-500'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => {
              const input = e.target.value;
              if (!/^[A-Za-z\s]+$/.test(input)) {
                enqueueSnackbar('Please enter letters only for Name', { variant: 'error' });
              } else {
                setName(input);
              }
            }}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-500'>Email</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-500'>IssueType</label>
          <input
            type='text'
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black-500'>Issue</label>
          <input
            type='text'
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>

        <button className='p-2 bg-black text-white m-8' onClick={handleEditTicket}>
          Save
        </button>
      </div>
    </div>
  )
}


export default EditTicketRecords