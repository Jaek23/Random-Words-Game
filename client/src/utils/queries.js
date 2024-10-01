import { gql } from '@apollo/client';

export const GET_RANDOM_WORD = gql`
    query{
        getRandom
    }
`
export const GET_USER = gql`
    query GetUser {
        getUser {
            username
            correctWordCount
        }
    }
`
export const GET_USER_HIGH_SCORE = gql `
    query GetUserHighScores {
        getUserHighScores {
            score
            date
        }
    }
`
;