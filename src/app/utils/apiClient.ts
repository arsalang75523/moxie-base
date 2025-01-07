import { GraphQLClient } from 'graphql-request';

const AIRSTACK_API = 'https://api.airstack.xyz/graphql';
const API_KEY = '13827f8b8c521443da97ed54d4d6a891d';

const client = new GraphQLClient(AIRSTACK_API, {
  headers: {
    Authorization: API_KEY,
  },
});

export default client;
