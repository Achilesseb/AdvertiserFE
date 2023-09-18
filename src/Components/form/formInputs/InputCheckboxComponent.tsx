import { FieldValues } from "react-hook-form";
import { InputCheckboxComponentPropTypes } from "./formInputs";
import CheckboxComponent from "../formAnnexes/Checkbox";

export const InputCheckboxComponent = <T extends {}, U extends FieldValues>({
  input,

  field,
}: InputCheckboxComponentPropTypes<T, U>) => {
  return (
    <CheckboxComponent
      {...field}
      key={input.fieldName}
      checked={field.value ?? (input.defaultFieldValue as boolean)}
      label={input.label}
      disabled={input.disabled ?? false}
    />
  );
};
