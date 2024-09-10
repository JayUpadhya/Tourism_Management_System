import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Home/login1.css'
import userIcon from '../../images/User/UserIcon.png'
import manIcon from '../../images/User/ManagerIcon.png'

export default function Login() {
  return (
    <div className="login1-container">
        
        <Link to='/userLogin'>
        <button className='userBtn'>
            <img src={userIcon}/>
            <p>User</p>
          </button>
        </Link>

          

          <Link to="/login2">

            <button className='manBtn'>
              <img src={manIcon}/>
              <p>Manager</p>
            </button>
            
          </Link>

        

      </div>
  )
}
