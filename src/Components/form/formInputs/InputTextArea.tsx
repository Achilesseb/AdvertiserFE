import { mergeStyles } from "@/utils/mergeStyles";

import { FieldValues } from "react-hook-form";
import { InputTextAreaPropTypes } from "./formInputs";
import { InputError } from "../formAnnexes/Error";

export const InputTextArea = <U extends FieldValues>({
  id,
  input,
  formTemplate,
  errors,
  field,
  ...props
}: InputTextAreaPropTypes<U>) => {
  const defaultTextArea =
    "w-full outline-none h-60 border rounded-md p-3 focus:border-neutral-50 transition ease-in-out duration-200 text-bodyLarge font-normal";
  return (
    <div
      className={mergeStyles(
        "flex flex-col gap-1 w-full",
        input?.containerClassName as string
      )}
    >
      {input?.label && (
        <label className={`mr-auto ${input.labelClassName}`}>
          {props.label as string}
          {input?.labelRequired && (
            <span className={input?.labelRequiredClassName}> *</span>
          )}
        </label>
      )}
      <textarea
        id={id as string}
        disabled={input?.disabled as boolean}
        className={`
        ${mergeStyles(
          defaultTextArea,
          (input?.inputClassName as string) ?? ""
        )} 
        ${input?.disabled ? "text-neutral-50 bg-neutral-95" : ""} 
        ${props?.errorExists ? "border-error-40" : "border-neutral-70"}`}
        {...field}
      />
      <InputError<U>
        errors={errors}
        field={input.fieldName}
        formTemplate={formTemplate}
        errorTextModifierStyles={input?.errorTextClassName}
      />
    </div>
  );
};
