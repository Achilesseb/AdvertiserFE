import {
  FormTemplateDefinitionInputType,
  FormTemplateSubFieldsType,
} from "../formTemplate";

import { FieldValues } from "react-hook-form";
import { FormInputsPropTypes } from "./formInputs";
import { FormInputs } from "./AllFormInputs";
import { InputError } from "../formAnnexes/Error";

export const FormGroupInputs = <T extends {}, U extends FieldValues>({
  formTemplate,
  control,
  errors,
  data,
  formTrigger,
  setValue,
  getValues,
  input,
  watch,
  ...props
}: FormInputsPropTypes<T, U>) => {
  const groupInput = input?.customGroupBehaviour?.({
    getValues,
    input,
    setValue,
    watch,
    touchedFields: props.touchedFields,
  }) as unknown as FormTemplateDefinitionInputType<U>;

  return (
    <div
      key={groupInput?.fieldName}
      className={
        groupInput?.groupClassName ?? "grid grid-cols-5 gap-x-6 relative pb-5 "
      }
    >
      <FormInputs
        formTemplate={groupInput?.subFields as FormTemplateSubFieldsType}
        control={control}
        errors={errors}
        data={data}
        setValue={setValue}
        formTrigger={formTrigger}
        parrentElement={input?.fieldName}
        getValues={getValues}
        watch={watch}
      />
      <InputError<U>
        errors={errors}
        field={input?.fieldName ?? ""}
        formTemplate={formTemplate}
        errorTextModifierStyles={groupInput?.errorTextClassName}
      />
    </div>
  );
};
