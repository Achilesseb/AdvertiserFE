import { supabase } from "@/supabase";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  ApolloLink,
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

const setAuthorizationLink = setContext(async (request, prevContext) => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Supabase authentication error:", error.message);
      throw error;
    }

    const userToken = data.session?.access_token;
    return {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
  } catch (err) {
    return console.error("Unauthorized");
  }
});

const httpAuthLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_DB_URI,
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),

  link: from([setAuthorizationLink, httpAuthLink]),
});

export default client;
