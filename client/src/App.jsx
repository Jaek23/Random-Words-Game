import React from "react";
import { ApolloProvider } from '@apollo/client';
import WordButton from './components/WordButton';
import client from "./apollo/apolloClient";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from "./pages/SignUpPage";

// Set up Apollo Client
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server URI
//   cache: new InMemoryCache(),
// });

// const client = new ApolloClient({
//   // uri:'http://localhost:3001/graphql',
//   uri:'http://localhost:5000/graphql',
//   cache: new InMemoryCache(),
// });


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<WordButton/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App
