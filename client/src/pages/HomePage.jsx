import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import { useQuery } from '@apollo/client';
// import { GET_USER } from '../utils/queries';

const HomePage = () => {
    // const {loading, error, data} = useQuery(GET_USER)
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate('/game');
    }

  return (
    <HomePageDiv>
      <Header>RandomWordGame</Header>
      <HeaderP><strong>Improve Your Typing Speed:</strong> This game is designed to help you improve your typing accuracy and speed while having fun.</HeaderP>
      <HeaderP><strong>Random Word Generation:</strong> A random would will appear on the screen, and your task is to type it out as quickly and accurately as possible.</HeaderP>
      <HeaderP><strong>Keep Track Of Your Progress:</strong> Create and account to save your high scores and track your typing performace over time.</HeaderP>
      <StyledButton onClick={handleStartGame}>Start Game</StyledButton>
    </HomePageDiv>
  )
}

export default HomePage

const HomePageDiv = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:80vh;
`
const Header = styled.h1`
    font-family:"Sigmar", sans-serif;
`
const HeaderP = styled.p`
    font-family: "Sigmar", sans-serif;
`
const StyledButton = styled.button`
    padding: 0.5rem 2rem; /* Increase padding for a bigger button */
    font-size: 1.2rem; /* Adjust font size */
    font-family: "Anton", sans-serif;
    color: white; /* Text color */
    background-color: #007bff; /* Button background color */
    border: 2px solid #0056b3; /* Border color */
    border-radius: 8px; /* Round the corners */
    cursor: pointer; /* Change cursor on hover */
    transition: background-color 0.3s, border-color 0.3s; /* Smooth transition for hover effects */
    margin-Top:20px;
`
