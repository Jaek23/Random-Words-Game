import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import WordButton from './components/WordButton';

// Set up Apollo Client
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server URI
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  uri:'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <WordButton/>
    </ApolloProvider>
  )
}

export default App
