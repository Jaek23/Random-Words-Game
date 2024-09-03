// Import express
const express = require('express');
// Import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const {expressMiddleware} = require('@apollo/server/express4')
const cors = require('cors'); // Import cors
const { typeDefs, resolvers } = require('./schemas');

const app = express();

// Use cors middleware
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// server.applyMiddleware({ app });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT,'0.0.0.0', () => {
//   console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
// });

const startApolloServer = async () => {
  await server.start();

  app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API server running on http://localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});
};

startApolloServer();