"use client";

import DefaultButtonComponent from "@/Components/DefaultButton";
import { Snackbar } from "@/Components/SnackBar";
import InputComponent from "@/Components/form/formInputs/InputComponent";
import { supabase } from "@/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ResetPasswordComponent = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [access_token, setAccessToken] = useState<string>();
  const [refresh_token, setRefreshToken] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    let hashArr: Array<string[]> = [];
    if (typeof window !== "undefined") {
      hashArr = window.location.hash
        .substring(1)
        .split("&")
        .map((param) => param.split("="));
    }
    for (const [key, value] of hashArr) {
      if (key === "access_token") {
        setAccessToken(value);
      }
      if (key === "refresh_token") {
        setRefreshToken(value);
      }
    }
  }, []);

  const onSubmit = async () => {
    try {
      if (password !== newPassword)
        return toast.custom(
          <Snackbar type="error" message={`Passwords don't match!`} />
        );
      if (!access_token || !refresh_token) return;
      await supabase.auth.setSession({
        access_token,
        refresh_token,
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
    <div className="w-full h-full flex justify-center items-center mobile:bg-primary-50 ">
      <div className="flex flex-col justify-center items-center text-center tablet:w-full laptop:w-[40vw] desktop:w-[40vw] laptop:h-[80vh] desktop:h-[80vh] tablet:h-full border-4 laptop:border-primary-40 desktop:border-primary-40 tablet:border-none">
        <div className="font-bold text-headlineSmall mb-20 tablet:text-white laptop:text-primary-40 desktop:text-primary-40 text-2xl">
          Reset password
        </div>

        <InputComponent
          name="password"
          type="password"
          id="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          labelRequired
          labelRequiredClassName="text-error-60"
          containerClassName={`w-4/5 text-primary-50 mt-6 tablet:text-white latpop:text-primary-40 desktop:text-primary-40 `}
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
          containerClassName={`w-4/5 text-primary-50 mt-6 tablet:text-white latpop:text-primary-40 desktop:text-primary-40 `}
          inputClassName="w-full"
        />

        <DefaultButtonComponent
          buttonType="button"
          onButtonClick={onSubmit}
          styleType="filled"
          buttonText="Reset password"
          modifier="tablet:w-4/5 laptop:w-2/5 desktop:w-2/5   tablet:bg-white tablet:text-primary-40 tablet:mt-16 laptop:mt-10 desktop:mt-10"
        />
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
