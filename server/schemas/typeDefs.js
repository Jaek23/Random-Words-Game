const {gql} = require('apollo-server-express');

// Define the GraphQL Schema 
const typeDefs = gql`
    type Query {
        getRandom: String
    }
    
    type User {
        id: ID!
        username: String!
        email:String!
        password:String!
        correctWordCount:Int!
    }
    
    type AuthPayload {
        token:String!
        user:User!
    }

    extend type Mutation {
        signUp(username: String!, email: String!, password: String!): AuthPayload!
        login(email: String!, password: String!): AuthPayload!
    }
    
    type Mutation {
        verifyWord(generatedWord: String!, typeWord: String!): Boolean!
    }
`;

module.exports = typeDefs;