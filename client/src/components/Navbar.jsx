import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({isLoggedIn, onLogout}) => {
  const navigate = useNavigate();

 const handleLogOut = () => {
  onLogout();
  navigate('/')
 }

  return (
    <div style={{display:'flex', justifyContent:'space-around'}}>
      <p>RandomWordGame</p>
      {isLoggedIn ? (
        <button onClick={handleLogOut}>Log Out</button>
      ) : (
        <Link to='/signup'>Sign Up</Link>
      )}
    </div>
  )
}

export default Navbar
