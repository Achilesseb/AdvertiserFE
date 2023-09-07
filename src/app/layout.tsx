"use client";
"use client";
import { NavigationBar } from "@/Components/NavigationBar";
import "./globals.css";

import { ReactNode } from "react";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { globalErrorMessageVar } from "../../apolloClient";
import toast, { Toaster } from "react-hot-toast";
import { Snackbar } from "@/Components/SnackBar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col h-[100vh] w-full gap-4 overflow-visible font-[Inter-500] ">
        <NavigationBar />
        <div className="w-full h-full py-0 px-4">
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </div>
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
