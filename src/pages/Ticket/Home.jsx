import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Ticket/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { PDFDownloadLink } from "@react-pdf/renderer";
import TicketPdf from '../../components/Ticket/TicketPdf';
import ticketImage from '../../images/Ticket/ticket.jpg';

const Home = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const keys = ["name", "email", "issueType", "issue"];

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/api/ticket")
      .then((response) => {
        setTickets(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Function to filter ticket data based on search query
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key] && item[key].toLowerCase().includes(query.toLowerCase()))
    );
  };

  return (
    <div className='p-4' style={{ backgroundImage: `url(${ticketImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '2rem', borderRadius: '1rem' }}>
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search..."
          className="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #ccc',
            width: '100%',
            marginBottom: '1rem',
          }}
        />

        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8 text-center'>Ticket List</h1>
          <Link to='/ticket/create'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-slate-600 rounded-md'>No</th>
                <th className='border border-slate-600 rounded-md'>ID</th>
                <th className='border border-slate-600 rounded-md'>Name</th>
                <th className='border border-slate-600 rounded-md'>Email</th>
                <th className='border border-slate-600 rounded-md'>Issue Type</th>
                <th className='border border-slate-600 rounded-md'>Issue</th>
                <th className='border border-slate-600 rounded-md'>Operations</th>
              </tr>
            </thead>
            <tbody>
              {search(tickets).map((ticket, index) => (
                <tr key={ticket._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {index + 1}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {ticket.t_id}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {ticket.name}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {ticket.email}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {ticket.issueType}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {ticket.issue}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/ticket/edit/${ticket._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                      </Link>
                      <Link to={`/ticket/delete/${ticket._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-600' />
                      </Link>
                      <PDFDownloadLink document={<TicketPdf ticket={ticket} />} fileName="FORM">
                        {({ loading }) =>
                          loading ? <button>loading...</button> : <button>Download</button>
                        }
                      </PDFDownloadLink>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default Home;
