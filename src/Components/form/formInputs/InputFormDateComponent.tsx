import { formatFormDate, setDatePickerLimits } from "@/utils/formatDate";

import { InputError } from "../formAnnexes/Error";
import { FieldValues } from "react-hook-form";
import { InputDateComponentPropTypes } from "./formInputs";
import InputComponent from "./InputComponent";

export const InputDateComponent = <T extends {}, U extends FieldValues>({
  field,
  formTemplate,
  data,
  input,
  errors,
  ...props
}: InputDateComponentPropTypes<T, U>) => {
  const defaultDateValue = formatFormDate(field.value);
  const customFieldValues = {
    ...field,
    value: defaultDateValue,
  };

  const { max, min } = setDatePickerLimits<T, U>(data as T, input);

  return (
    <div className="relative">
      <InputComponent
        {...customFieldValues}
        name={input.fieldName}
        type="date"
        id="startDate"
        label={props.label as string}
        error={props.errorExists as string}
        min={min}
        max={max}
        disabled={input?.disabled}
        inputClassName={`w-full ${input?.inputClassName}`}
        labelClassName={`${input?.labelClassName}`}
        labelRequired={true}
        labelRequiredClassName={input.labelRequiredClassName ?? "text-error-60"}
        containerClassName={`${props.errorExists && "mb-4 mt-2"} w-full ${
          input?.containerClassName
        }`}
      />
      <InputError<U>
        errors={errors}
        field={input.fieldName}
        formTemplate={formTemplate}
      />
    </div>
  );
};
