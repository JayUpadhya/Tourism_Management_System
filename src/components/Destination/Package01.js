import React from 'react'
import './package01.css'
import { Link } from 'react-router-dom'

export default function Package01(props) {
  return (
    <div className='pck'>
        <div className='pck-img'>
            {props.children}
        </div>
        <p className='pck-title'>Tour to {props.destination}</p>
        <p className='pck-description'>{props.describe}</p>
        <Link to="/attractions">
          <button className='pck-btn'>More</button>
        </Link>
        
    </div>
  )
}
