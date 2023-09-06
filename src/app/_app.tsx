import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import client from "../../apolloClient";
import RootLayout from "@/app/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="font-Inter400 font-Inter500 font-Inter700 font-Inter600">
      <ApolloProvider client={client}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ApolloProvider>
    </main>
  );
}
export default MyApp;
