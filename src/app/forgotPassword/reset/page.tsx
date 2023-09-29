"use client";

import DefaultButtonComponent from "@/Components/DefaultButton";
import { Snackbar } from "@/Components/SnackBar";
import InputComponent from "@/Components/form/formInputs/InputComponent";
import { supabase } from "@/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  let hashArr: Array<string[]> = [];

  if (window) {
    hashArr = window.location.hash
      .substring(1)
      .split("&")
      .map((param) => param.split("="));
  }

  let accessToken: string, refreshToken: string;

  for (const [key, value] of hashArr) {
    if (key === "access_token") {
      accessToken = value;
    }
    if (key === "refresh_token") {
      refreshToken = value;
    }
  }

  const onSubmit = async () => {
    try {
      if (password !== newPassword)
        return toast.custom(
          <Snackbar type="error" message={`Passwords don't match!`} />
        );

      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      await supabase.auth.updateUser({ password });

      await supabase.auth.signOut();

      toast.custom(
        <Snackbar type="success" message={`Password updated succesfully!`} />
      );
      router.push("/");
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
        <InputComponent
          name="new password"
          type="password"
          id="newpassword"
          label="Confirm new password"
          onChange={(e) => setNewPassword(e.target.value)}
          labelRequired
          labelRequiredClassName="text-error-60"
          containerClassName={`w-4/5 text-primary-50 mt-6`}
          inputClassName="w-full"
        />

        <DefaultButtonComponent
          buttonType="button"
          onButtonClick={onSubmit}
          styleType="filled"
          buttonText="Reset password"
          modifier="w-2/5 mt-10"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
