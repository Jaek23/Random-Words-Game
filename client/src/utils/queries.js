import { gql } from '@apollo/client';

export const GET_RANDOM_WORD = gql`
    query{
        getRandomWord
    }
`