import React from 'react';
import '../../styles/Booking/HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <p className='title'>Largest Tourstists Destination</p>

      <div className='homeSet'>
        <p className='nameSite'>JourneyX</p>
        <p className='quote'>Welcome to Sri Lanka</p>
      </div>

      <Link to='/adminpanel'><button className='adminButton'>Admin Panel</button></Link>

    </div>
  )
}

export default HomePage