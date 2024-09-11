import { gql } from '@apollo/client';

// Signup mutation 
export const SIGNUP_USER = gql`
    mutation SignUp($username: String!, $email:String!, $password:String!) {
        signUp(username:$username, email:$email, password:$password) {
            token
            user {
                id
                username
                email
            }
        }
    }
`;

// Login mutation 
export const LOGIN_USER = gql`
    mutation Login($email: String!, $password:String!) {
        login(email:$email, password:$password) {
            token
            user{
                id
                username
                email
            }
        }
    }
`;