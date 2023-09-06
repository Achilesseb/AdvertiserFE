"use client";
"use client";
import { NavigationBar } from "@/Components/NavigationBar";
import "./globals.css";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../../apolloClient";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col h-[100vh] w-full gap-4 overflow-visible ">
        <NavigationBar />
        <div className="w-full h-full py-0 px-4">
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </div>
      </body>
    </html>
  );
}
