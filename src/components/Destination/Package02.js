import React from 'react'
import './package02.css'
import starImage from '../../images/Destination/BlackStar.png'
import { Link } from 'react-router-dom'

export default function Package02(props) {
  return (
    <div className='dSection'>
        <div className="dSection-img">
            {props.children}
        </div>
        <div className='dSection-info'>
            <div className="dSection-title">
                <p className='dName'>{props.destination}</p>
                <div className='dRating'>
                    <img className='dStar' src={starImage} width='16px' height='16px'></img>
                    <p className='dRate'>{props.rate}</p>
                </div>

            </div>
            <div className="dSection-description">
                <p>{props.describe}</p>

            </div>
            <div className='dSection-btn'>
                <Link to={props.to} target='_blank'>
                    <button>Explore More &#8594;</button>
                </Link>   
            </div>
        </div>
    </div>
  )
}
