import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";

const httpAuthLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_DB_URI,
  //   credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link: from([httpAuthLink]),
});

export default client;
