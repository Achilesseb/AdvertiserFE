"use client";

import DefaultButtonComponent from "@/Components/DefaultButton";
import { Snackbar } from "@/Components/SnackBar";
import InputComponent from "@/Components/form/formInputs/InputComponent";
import { supabase } from "@/supabase";
import { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async () => {
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: process.env.NEXT_PUBLIC_REDIRECT_PAGE,
      });

      setEmailSent(true);
    } catch (error) {
      toast.custom(<Snackbar type="error" message={`Something went wrong!`} />);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-[40vw] h-[80vh] border-2 border-primary-40">
        <div className="font-bold text-headlineSmall mb-20 text-primary-40 text-2xl">
          Reset your SmartAds password
        </div>
        <InputComponent
          name="email"
          type="email"
          id="email"
          label="Email"
          disabled={emailSent}
          labelRequired
          labelRequiredClassName="text-error-60"
          onChange={(e) => setEmail(e.target.value)}
          inputClassName="w-full "
          containerClassName={`w-3/5 text-primary-50`}
        />

        {!emailSent ? (
          <DefaultButtonComponent
            buttonType="button"
            onButtonClick={onSubmit}
            styleType="filled"
            buttonText="Reset password"
            modifier="w-2/5 mt-10"
          />
        ) : (
          <p className="w-3/5 text-success-30 mt-4 border-2 border-neutral-40 p-5">
            Check your inbox for the next steps. If you do not receive an email,
            and it is not in your spam folder this could mean you signed up with
            a different address.
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
