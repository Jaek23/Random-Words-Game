const express = require('express');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const {typeDefs, resolvers} = require('./schemas');

const port = process.env.PORT || 5000;

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({app});

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`GraphQL path: http://localhost:${port}${server.graphqlPath}`);
  })
}

startServer();