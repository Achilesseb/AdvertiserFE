"use client";
import { NavigationBar } from "@/Components/NavigationBar";
import "../styles/input.css";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../../apolloClient";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/Components/UserProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col h-[100vh] w-full gap-4 overflow-visible font-[Inter-500] overflow-x-hidden ">
        <UserProvider>
          <NavigationBar />
          <div className="w-full h-full py-0 px-4">
            <ApolloProvider client={client}>{children}</ApolloProvider>
          </div>
        </UserProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 1000,
          }}
          containerStyle={{ marginBottom: "40px" }}
        />
      </body>
    </html>
  );
}
