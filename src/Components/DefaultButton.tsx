import React from "react";

export type DefaultButtonComponentProps = {
  buttonText: string;
  buttonType?: "button" | "submit" | "reset";
  styleType:
    | "filled"
    | "outlined"
    | "text"
    | "elevated"
    | "tonal"
    | "custom"
    | "dirty";
  modifier?: string;
  disabled?: boolean;
  large?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const DefaultButtonComponent = ({
  buttonText,
  buttonType,
  modifier = "",
  onButtonClick,
  styleType,
  large,
  iconLeft,
  iconRight,
  disabled = false,
}: DefaultButtonComponentProps) => {
  const defaultButton = `flex items-center justify-center h-10 gap-2 font-medium border border-2 rounded-full transition ease-in-out duration-200 text-labelLarge box-border ${
    large ? "py-4" : ""
  }`;

  const filledButton = (
    iconRight: React.ReactNode,
    iconLeft: React.ReactNode
  ) => {
    if (iconRight) {
      return "py-2.5 pr-4 pl-6";
    }
    if (iconLeft) {
      return "py-2.5 pr-6 pl-4";
    }
    return "py-2.5 px-6";
  };

  const outlinedButton = (
    iconRight: React.ReactNode,
    iconLeft: React.ReactNode
  ) => {
    if (iconRight) {
      return "py-2.5 pr-4 pl-6";
    }
    if (iconLeft) {
      return "py-2.5 pr-6 pl-4";
    }
    return "py-2.5 px-6";
  };

  const textButton = (
    iconRight: React.ReactNode,
    iconLeft: React.ReactNode
  ) => {
    if (iconRight) {
      return "py-2.5 pr-3 pl-4";
    }
    if (iconLeft) {
      return "py-2.5 pr-4 pl-3";
    }
    return "py-2.5 px-3";
  };

  const elevatedButton = (
    iconRight: React.ReactNode,
    iconLeft: React.ReactNode
  ) => {
    if (iconRight) {
      return "py-2 pr-4 pl-6";
    }
    if (iconLeft) {
      return "py-2 pr-6 pl-4";
    }
    return "py-2 px-6";
  };

  const tonalButton = (
    iconRight: React.ReactNode,
    iconLeft: React.ReactNode
  ) => {
    if (iconRight) {
      return "py-2 pr-4 pl-6";
    }
    if (iconLeft) {
      return "py-2 pr-6 pl-4";
    }
    return "py-2 px-6";
  };

  const dirtyButton = (
    iconRight: React.ReactNode,
    iconLeft: React.ReactNode
  ) => {
    if (iconRight) {
      return "py-2.5 pr-4 pl-6";
    }
    if (iconLeft) {
      return "py-2.5 pr-6 pl-4";
    }
    return "py-2.5 px-6";
  };

  const disabledTypes = {
    filled: `${filledButton(
      iconRight,
      iconLeft
    )} bg-neutral-90 text-neutral-60 border-none`,
    outlined: `${outlinedButton(
      iconRight,
      iconLeft
    )} bg-white text-neutral-80 border-neutral-80`,
    text: `${textButton(
      iconRight,
      iconLeft
    )} bg-white text-neutral-80 border-none`,
    elevated: `${elevatedButton(
      iconRight,
      iconLeft
    )} bg-neutral-90 text-neutral-60 border-none`,
    tonal: `${tonalButton(
      iconRight,
      iconLeft
    )} bg-neutral-90 text-neutral-60 border-none`,
  };
  const styleTypes = {
    filled: `${filledButton(
      iconRight,
      iconLeft
    )} bg-primary-40 text-white hover:bg-primary-30 focus:bg-primary-30 active:bg-primary-20 border-primary-40 hover:border-primary-30 focus:border-primary-30 active:border-primary-20`,
    outlined: `${outlinedButton(
      iconRight,
      iconLeft
    )} bg-white text-primary-40 hover:bg-primary-99 focus:bg-primary-95 active:bg-primary-90 border-neutral-50 focus:border-primary-40`,
    text: `${textButton(
      iconRight,
      iconLeft
    )} bg-transparent text-primary-40 hover:bg-primary-99 focus:bg-primary-95 active:bg-primary-90 border-none`,
    elevated: `${elevatedButton(
      iconRight,
      iconLeft
    )} bg-primary-99 text-primary-40 border-none shadow-sm shadow-neutral-60 hover:shadow-md hover:shadow-neutral-80 focus:shadow-neutral-80 hover:bg-primary-95 focus:bg-primary-90 active:bg-primary-95`,
    tonal: `${tonalButton(
      iconRight,
      iconLeft
    )} bg-primary-99 hover:bg-primary-95 focus:bg-primary-90 active-bg-primary-95 border-none text-black`,
    dirty: `${dirtyButton(
      iconRight,
      iconLeft
    )} bg-primary-99 text-primary-40 hover:bg-primary-95 focus:bg-primary-95 active:bg-primary-90 border-neutral-50 focus:border-primary-40`,
    custom: "",
  };
  return (
    <button
      onClick={onButtonClick}
      className={`${defaultButton} ${
        disabled
          ? disabledTypes[styleType as keyof typeof disabledTypes]
          : styleTypes[styleType as keyof typeof styleTypes]
      } ${modifier} `}
      type={buttonType}
      disabled={disabled}
    >
      {iconLeft && iconLeft}
      <div className="text-center">{buttonText}</div>
      {iconRight && iconRight}
    </button>
  );
};

export default DefaultButtonComponent;
