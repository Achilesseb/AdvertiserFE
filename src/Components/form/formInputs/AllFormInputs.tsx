import { FieldValues, Path } from "react-hook-form";
import {
  FormTemplateDefinition,
  FormTemplateSubFieldsType,
} from "../formTemplate";
import { FormCustomInputElement } from "./InputCustomElement";
import { FormInputsPropTypes } from "./formInputs";
import { FormGroupInputs } from "./FormGroupInputs";
import { FormDefaultInputs } from "./FormDefaultInputs";

export const FormInputs = <T extends {}, U extends FieldValues>({
  formTemplate,
  control,
  errors,
  data,
  formTrigger,
  setValue,
  parrentElement,
  dirtyFields,
  touchedFields,
  getValues,
  watch,
}: FormInputsPropTypes<T, U>): JSX.Element => {
  const getFieldName = (inputFieldName: string): Path<U> => {
    if (parrentElement) {
      return `${parrentElement}.${inputFieldName}` as unknown as Path<U>;
    }
    return inputFieldName as unknown as Path<U>;
  };

  return (
    <>
      {Object.values(
        formTemplate as FormTemplateDefinition<U> | FormTemplateSubFieldsType
      ).map((input) => {
        if (input.type === "react-element" && input.element) {
          return (
            <FormCustomInputElement<U>
              key={input.fieldName}
              input={input}
              setValue={setValue}
              getValues={getValues}
              control={control}
              formTrigger={formTrigger}
              errors={errors}
              dirtyFields={dirtyFields}
              touchedFields={touchedFields}
              {...{ watch }}
            />
          );
        }

        if (input.type === "group" && input.subFields) {
          return (
            <div key={input.fieldName}>
              {input.groupLabel?.({
                input,
              })}
              <FormGroupInputs
                formTemplate={formTemplate}
                control={control}
                errors={errors}
                data={data}
                setValue={setValue}
                formTrigger={formTrigger}
                getValues={getValues}
                input={input}
                watch={watch}
                {...{ touchedFields }}
              />
            </div>
          );
        }
        return (
          <span key={input.fieldName}>
            <FormDefaultInputs<T, U>
              key={input.fieldName}
              input={input}
              formTemplate={formTemplate}
              data={data}
              errors={errors}
              control={control}
              getFieldName={getFieldName}
              {...{
                getValues,
                setValue,
                watch,
                formTrigger,
              }}
            />
          </span>
        );
      })}
    </>
  );
};
