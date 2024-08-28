import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server URI
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
