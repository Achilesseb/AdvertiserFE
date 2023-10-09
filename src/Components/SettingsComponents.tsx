"use client";

import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Snackbar } from "./SnackBar";
import InputComponent from "./form/formInputs/InputComponent";
import DefaultButtonComponent from "./DefaultButton";
import { AuthSession } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { AllConstantsPage } from "./ConstantsComponent";

export const SettingsComponent = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [session, setSession] = useState<AuthSession | null>(null);
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const onSubmit = async () => {
    try {
      if (newPassword !== confirmNewPassword)
        return toast.custom(
          <Snackbar type="error" message={`Password don't match!`} />
        );
      const { error, data } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (data)
        toast.custom(
          <Snackbar type="success" message={`Password changed succesfully!`} />
        );

      throw error;
    } catch (error) {
      if (error) {
        toast.custom(
          <Snackbar type="error" message={`Something went wrong!`} />
        );
      }
    } finally {
      setConfirmNewPassword("");
      setNewPassword("");
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      if (error) {
        toast.custom(
          <Snackbar type="error" message={`Something went wrong!`} />
        );
      }
    } finally {
      router.push("/");
    }
  };

  return (
    <div className="flex w-full gap-10 tablet:gap-2 tablet:flex-col  laptop:mt-2">
      <div className="flex flex-col  justify-center items-center tablet:gap-4 laptop:gap-6 laptop:w-4/12 tablet:w-12/12 tablet:p-4 border-2 laptop:py-4 border-neutral-60">
        <div className="font-bold text-headlineSmall mb-4 text-primary-40 text-lg">
          Change user data
        </div>
        <InputComponent
          name="email"
          type="email"
          id="email"
          label="Email"
          value={session?.user?.email}
          disabled
          labelRequired
          labelRequiredClassName="text-error-60"
          inputClassName="w-full"
          containerClassName={`desktop:w-4/5 laptop:w-full tablet:w-full`}
        />

        <InputComponent
          name="password"
          type="password"
          id="password"
          label="New password"
          onChange={(e) => setNewPassword(e.target.value)}
          labelRequired
          value={newPassword}
          labelRequiredClassName="text-error-60"
          containerClassName={`desktop:w-4/5 laptop:w-full tablet:w-full`}
          inputClassName="w-full"
        />
        <InputComponent
          name="password"
          type="password"
          id="confirmPassword"
          label="Confirm new password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          labelRequired
          labelRequiredClassName="text-error-60"
          containerClassName={`desktop:w-4/5 laptop:w-full tablet:w-full`}
          inputClassName="w-full"
        />

        <DefaultButtonComponent
          onButtonClick={onSubmit}
          buttonType="button"
          styleType="filled"
          buttonText="Change password"
          modifier="desktop:w-3/5 laptop:w-4/5 mt-4 tablet:w-full"
        />

        <DefaultButtonComponent
          onButtonClick={logout}
          buttonType="button"
          styleType="filled"
          buttonText="Log out"
          modifier="desktop:w-3/5 laptop:w-4/5 mt-10 tablet:w-full"
        />
      </div>
      <AllConstantsPage />
    </div>
  );
};
