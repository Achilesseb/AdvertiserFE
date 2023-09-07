import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  makeVar,
} from "@apollo/client";

export type GlobalErrorType = {
  messageKey: string;
  messageParams: Record<string, string> | {};
};

export const globalErrorMessageVar = makeVar<GlobalErrorType[]>([]);

const httpAuthLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_DB_URI,
  //   credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link: from([httpAuthLink]),
  // connectToDevTools: true
});

export default client;
