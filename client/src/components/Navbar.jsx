import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle logging out 
  const handleLogOut = () => {
    localStorage.removeItem('token'); // Remove the token from local Storage
    navigate('/'); // Redirect to word component when logged out 
  };

  // Check is user is logged in by checking for the token in local Storage 
  const isLoggedIn = !!localStorage.getItem('token');

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
