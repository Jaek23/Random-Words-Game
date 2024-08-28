const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors'); // Import cors
const { typeDefs, resolvers } = require('./schemas');

const app = express();

// Use cors middleware
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
});