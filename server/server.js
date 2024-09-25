const express = require('express');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const {typeDefs, resolvers} = require('./schemas');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 5000;

// Connect to database 
connectDB();

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Get the token from the request headers (make sure "Bearer " is handled)
      const token = req.headers.authorization?.split(' ')[1] || ''; // Extract token from 'Bearer <token>'
  
      if (token) {
        try {
          // Verify the token
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
          // Return the user info in the context
          return { userId: decodedToken.userId };
        } catch (error) {
          console.warn('Invalid token:', error.message);
          // If token is invalid, return an empty context to avoid authentication issues
          return {};
        }
      }
  
      // No token present, no user authenticated
      return {};
    },
  });

  await server.start();
  server.applyMiddleware({app});

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`GraphQL path: http://localhost:${port}${server.graphqlPath}`);
  })
}

startServer();