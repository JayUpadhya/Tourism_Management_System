import React from 'react';
import '../../styles/Employee/Navbar.css';

const Navbar = () => {
     return (
          <nav className='navbar'>
               <div>
               <h2> JournyX</h2>
               </div>
               
               <ul className="nav-links">
                    <li>
                         <a href="Dashboard">Employee Registration</a>
                    </li>
                    <li>
                         <a href="EmpLeave">Employee Leave</a>
                    </li>
                    <li>
                         <a href="#">Employee Performance</a>
                    </li>
                    <li>
                         <a href="#">Log Out</a>
                    </li>
               </ul>
          </nav>
     );
};

export default Navbar;