const {gql} = require('apollo-server-express');

// Define the GraphQL Schema 
const typeDefs = gql`
    type Query {
        getRandom: String
    }
    
    type Mutation {
        verifyWord(generatedWord: String!, typeWord: String!): Boolean!
    }
`;

module.exports = typeDefs;