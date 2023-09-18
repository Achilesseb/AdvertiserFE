"use client";
import React from "react";

export type DefaultButtonComponentProps = {
  buttonText: string;
  buttonType?: "button" | "submit" | "reset";
  styleType: "filled" | "outlined" | "dirty";
  modifier?: string;
  disabled?: boolean;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const ADVButton = ({
  buttonText,
  buttonType,
  modifier = "",
  onButtonClick,
  styleType,
  disabled = false,
}: DefaultButtonComponentProps) => {
  const defaultButton =
    "flex items-center justify-center h-10 gap-2 px-10 font-medium border border-2 rounded-xl min-w-18 transition ease-in-out duration-200 text-labelLarge box-border";

  const styleTypes = {
    filled:
      " bg-primary-50 text-white hover:bg-primary-30 focus:bg-primary-30 active:bg-primary-20 border-primary-40 hover:border-primary-30 focus:border-primary-30 active:border-primary-20",
    outlined:
      "bg-white text-primary-40 hover:bg-primary-90 focus:bg-primary-95 active:bg-primary-90 border-neutral-50  focus:border-primary-40",

    dirty:
      "bg-primary-99 text-primary-40 hover:bg-primary-95 focus:bg-primary-95 active:bg-primary-90 border-neutral-50 focus:border-primary-40",
    custom: "",
  };
  return (
    <button
      onClick={onButtonClick}
      className={`${defaultButton} ${
        disabled ? "" : styleTypes[styleType as keyof typeof styleTypes]
      } ${modifier} `}
      type={buttonType}
      disabled={disabled}
    >
      <div className="text-center">{buttonText}</div>
    </button>
  );
};

export default ADVButton;
