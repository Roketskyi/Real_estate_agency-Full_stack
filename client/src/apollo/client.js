import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // URL до вашого GraphQL сервера
  cache: new InMemoryCache(),
});

export default client;
