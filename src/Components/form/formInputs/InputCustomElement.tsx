import { FieldValues } from "react-hook-form";
import { FormCustomInputPropTypes } from "./formInputs";

export const FormCustomInputElement = <U extends FieldValues>({
  input,
  control,
  setValue,
  dirtyFields,
  touchedFields,
  getValues,
  formTrigger,
  errors,
}: FormCustomInputPropTypes<U>) => {
  if (!input.element) return null;

  if (typeof input.element === "function")
    return (
      <div className="flex relative pb-6">
        {input?.element?.(formTrigger, errors, {
          control: control,
          setValue: setValue,
          dirtyFields: dirtyFields,
          touchedFields,
          getValues,
          ...input,
        })}
      </div>
    );

  return input.element;
};
