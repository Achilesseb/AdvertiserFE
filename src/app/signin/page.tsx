"use client";
import React, { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";
import { signUp } from "@/firebase/auth";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      router.push("/");
    } catch (err) {
      return console.error(err);
    } finally {
      setPassword("");
      setEmail("");
    }
  };

  return (
    <div className="  overflow-hidden h-full flex flex-col  justify-center">
      <div className="text-center mt-2">
        <div className="flex items-center justify-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-12 h-12 text-blue-500"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-4xl tracking-tight">Create a new account</h2>
        <span className="text-sm">
          or{" "}
          <a href="/login" className="text-blue-500">
            Already have an account? LogIn!
          </a>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form
          className="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
          onSubmit={handleLoginSubmit}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="Password"
              >
                Email address
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="Password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full flex items-center justify-between  mb-4 ">
              <label
                htmlFor="remember"
                className="flex items-center justify-center w-1/2"
              ></label>
              <div className="w-1/2 text-right">
                <a href="#" className="text-blue-500 text-sm tracking-tight">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <button
                type="submit"
                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
