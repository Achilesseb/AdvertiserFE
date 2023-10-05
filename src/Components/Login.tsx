"use client";

import { supabase } from "@/supabase";
import { useState } from "react";
import toast from "react-hot-toast";
import { Snackbar } from "./SnackBar";
import InputComponent from "./form/formInputs/InputComponent";
import Link from "next/link";
import DefaultButtonComponent from "./DefaultButton";

export const SignInFormComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
    } catch (error) {
      toast.custom(<Snackbar type="error" message={`Something went wrong!`} />);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <div className="flex flex-col justify-center items-center mobile:gap-10 laptop:w-[40vw] h-[80vh] tablet:h-full tablet:w-full border-2 border-primary-40 ">
        <div className="font-bold text-headlineSmall laptop:mb-20 tablet:mb-4 text-primary-40 text-2xl">
          Login to SmartADS
        </div>
        <InputComponent
          name="email"
          type="email"
          id="email"
          label="Email"
          labelRequired
          labelRequiredClassName="text-error-60"
          onChange={(e) => setEmail(e.target.value)}
          inputClassName="w-full "
          containerClassName={`w-4/5 text-primary-50`}
        />

        <InputComponent
          name="password"
          type="password"
          id="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          labelRequired
          labelRequiredClassName="text-error-60"
          containerClassName={`w-4/5 text-primary-50 mt-6`}
          inputClassName="w-full"
        />
        <span className="w-4/5 mt-10 text-natural-10 font-bold underline text-bodySmall hover:cursor-pointer text-primary-50">
          <Link href="/forgotPassword" className="text-primary-50 no-underline">
            Forgot password?
          </Link>
        </span>

        <DefaultButtonComponent
          buttonType="button"
          onButtonClick={onSubmit}
          styleType="filled"
          buttonText="Log In"
          modifier="laptop:w-2/5 tablet:w-4/5 mt-10"
        />
      </div>
    </div>
  );
};
