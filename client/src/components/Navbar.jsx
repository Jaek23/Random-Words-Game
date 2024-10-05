import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = ({isLoggedIn, onLogout}) => {
  const navigate = useNavigate();

 const handleLogOut = () => {
  onLogout();
  navigate('/')
 }

 const backHome = () => {
  navigate('/');
}

  return (
    <StyledDiv>
      <NavP onClick={backHome}>RandomWordGame</NavP>
      <div style={{display:'flex', gap:'20px'}}>
      {isLoggedIn ? (
        <StyledLink onClick={handleLogOut}>Log Out</StyledLink>
      ) : (
      <StyledLink to='/signup'>Sign Up</StyledLink>
      )}
      {isLoggedIn && <StyledLink to='/score'>Score</StyledLink>}
      </div>
    </StyledDiv>
  )
}

export default Navbar

const StyledDiv = styled.div`
  font-family: "Sigmar", sans-serif;
  font-weight: 400;
  font-size:25px;
  display:flex;
  justify-content:space-around;
  align-items:center;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &: hover {
    text-decoration:underline;
  }
`
const NavP = styled.p`
  cursor:pointer;
  text-decoration: none;
  color:black;
`