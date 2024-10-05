import React, { useEffect, useState } from "react";
import { ApolloProvider } from '@apollo/client';
import WordButton from './components/WordButton';
import client from "./apollo/apolloClient";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from "./pages/SignUpPage";
import HighScorePage from "./pages/HighScorePage";
import HomePage from "./pages/HomePage";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Effect to track changes in localStorage token and update isLoggedIn state 
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Function to handle login
  const handleLogIn = () => {
    setIsLoggedIn(true); // Manually set to true right after login
  };

  // Function to handle logout from Navbar and update state 
  const handleLogOut = async () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);

    try{
      await client.clearStore();
    } catch (err) {
      console.error('Error clearing cache', err);
    }
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogOut}/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/game" element={<WordButton isLoggedIn={isLoggedIn}/>}/>
          <Route path="/signup" element={<SignUpPage onLogIn={handleLogIn}/>}/>
          <Route path="/score" element={<HighScorePage isLoggedIn={isLoggedIn}/>}/>
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App
