"use client";
import { NavigationBar } from "@/Components/NavigationBar";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col h-[100vh] w-full gap-4 overflow-visible ">
        <NavigationBar />
        <div className="w-full h-full py-0 px-4">
          <AuthContextProvider>{children}</AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
