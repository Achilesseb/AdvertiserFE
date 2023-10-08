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
      <body className="flex flex-col h-[100vh] w-full tablet:gap-0 laptop:gap-4 laptop:pb-4 overflow-visible font-[Inter-500]  ">
        <UserProvider>
          <NavigationBar />
          <div className="w-full h-full py-0 tablet:px-0 desktop:px-4  laptop:px-4 tablet:relative">
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
