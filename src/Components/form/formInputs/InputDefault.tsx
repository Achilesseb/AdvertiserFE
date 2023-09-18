import { InputComponent } from "./InputComponent";
import { InputError } from "../formAnnexes/Error";
import { FieldValues } from "react-hook-form";
import { FormDefaultInputPropTypes } from "./formInputs";

export const FormDefaultInput = <U extends FieldValues>({
  input,
  formTemplate,
  field,
  errors,
  ...props
}: FormDefaultInputPropTypes<U>) => (
  <div className={`relative ${input?.containerClassName}`}>
    <InputComponent
      {...field}
      label={input.label}
      labelRequired={input?.labelRequired}
      labelRequiredClassName={input.labelRequiredClassName ?? "text-error-60"}
      containerClassName={`${input?.containerClassName ?? ""} ${
        props.errorExists && "mb-2 mt-2"
      } `}
      inputClassName={`w-full relative ${input?.inputClassName}`}
      labelClassName={`${input?.labelClassName}`}
      error={props.errorExists as string}
      disabled={input?.disabled}
    />
    <InputError<U>
      errors={errors}
      field={input.fieldName}
      formTemplate={formTemplate}
      errorTextModifierStyles={input?.errorTextClassName}
    />
  </div>
);
