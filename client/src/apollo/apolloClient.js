import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

// HTTP link to GraphQL API 
const httpLink = createHttpLink({
    uri:'http://localhost:5000/graphql', // My backend GraphQL server URI 
});

// Authentication link to include token 
const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

// Combine the authlink with the httpLink
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(), 
});

export default client;