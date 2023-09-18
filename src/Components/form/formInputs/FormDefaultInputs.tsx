import { InputCheckboxComponent } from "./InputCheckboxComponent";
import { InputDateComponent } from "./InputFormDateComponent";
import { FormDefaultInput } from "./InputDefault";
import { InputTextArea } from "./InputTextArea";
import { Controller, FieldValues } from "react-hook-form";
import { FormDefaultInputsPropTypes } from "./formInputs";

export const FormDefaultInputs = <T extends {}, U extends FieldValues>({
  input,
  formTemplate,
  getFieldName,
  control,
  errors,
  data,
  t,
  ...props
}: FormDefaultInputsPropTypes<T, U>) => {
  return (
    <Controller
      key={input.fieldName}
      name={getFieldName(input.fieldName)}
      control={control}
      render={({ field }) => {
        const errorExists = errors?.[input.fieldName]?.message;

        if (input.type === "checkbox") {
          return (
            <InputCheckboxComponent<T, U>
              input={input}
              field={field}
              {...{ ...props, errorExists }}
            />
          );
        }

        if (input.type === "date") {
          return (
            <InputDateComponent<T, U>
              input={input}
              formTemplate={formTemplate}
              field={field}
              data={data}
              errors={errors}
              {...{ ...props, errorExists }}
            />
          );
        }

        if (input.type === "textarea") {
          return (
            <InputTextArea<U>
              formTemplate={formTemplate}
              field={field}
              input={input}
              errors={errors}
              {...{ ...props, errorExists }}
            />
          );
        }
        return (
          <FormDefaultInput<U>
            input={input}
            formTemplate={formTemplate}
            field={field}
            errors={errors}
            {...{ ...props, errorExists }}
          />
        );
      }}
    />
  );
};
