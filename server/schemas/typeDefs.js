const {gql} = require('apollo-server-express');

// Define the GraphQL Schema 
const typeDefs = gql`
    type Query {
        getRandom: String
    }
    
    type Mutation {
        verifyWord(generatedWordInput: String!, typedWord: String!): Boolean!
    }
`;

module.exports = typeDefs;