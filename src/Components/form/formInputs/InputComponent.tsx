import { mergeStyles } from "../../../utils/mergeStyles";
import React, { forwardRef } from "react";

type InputProps = {
  id?: string;
  name: string;
  label?: string | null;
  type?: "text" | "email" | "password" | "date" | "file";
  className?: string;
  placeholder?: string;
  error?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  defaultValue?: string;
  min?: string | number;
  max?: string | number;
  disabled?: boolean;
  value?: string | number;
  labelRequired?: boolean;
  labelRequiredClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type,
      placeholder,
      error,
      disabled = false,
      inputClassName = "",
      labelClassName = "",
      containerClassName = "",
      labelRequired,
      labelRequiredClassName,
      value,
      ...props
    },
    ref
  ) => {
    const defaultInput =
      "outline-none w-74 h-12 border rounded-md p-3 focus:border-neutral-50 transition ease-in-out duration-200 text-bodyLarge font-normal";

    const mergedStyles = mergeStyles(defaultInput, inputClassName);

    return (
      <div className={`flex flex-col gap-1 ${containerClassName}`}>
        {label && (
          <label htmlFor={name} className={`mr-auto ${labelClassName}`}>
            {label}
            {labelRequired && (
              <span className={labelRequiredClassName}> *</span>
            )}
          </label>
        )}
        <input
          id={id}
          name={name}
          type={type}
          disabled={disabled}
          className={`${mergedStyles} ${
            error ? "border-error-40" : "border-neutral-70"
          } ${disabled ? "text-neutral-50 bg-neutral-95" : ""}`}
          placeholder={placeholder}
          ref={ref}
          value={value}
          {...props}
        />
      </div>
    );
  }
);
InputComponent.displayName = "Input";
export default InputComponent;
