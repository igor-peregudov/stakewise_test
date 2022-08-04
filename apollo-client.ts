import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://eu1.prisma.sh/nevena-djaja/mocks/dev',
  cache: new InMemoryCache(),
});

export default client;
