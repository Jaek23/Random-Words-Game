const {gql} = require('apollo-server-express');

// Define the GraphQL Schema 
const typeDefs = gql`
    type Query {
        getRandom: String
        getUser: User
        getUserHighScores: [HighScore]
    }
    
    type HighScore {
        score: Int
        date: String
    }
    
    type User {
        id: ID!
        username: String!
        email:String!
        password:String!
        correctWordCount:Int!
        highScores: [HighScore]
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