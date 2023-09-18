import { FormTemplateDefinition } from "@/Components/form/formTemplate";
import _ from "lodash";
import { findNestedFieldValue } from "../findNested";

export const setFormDefaultValues = <T, U extends {}>(
  template: FormTemplateDefinition<U>,
  data: T
): U => {
  const generateFormValues = (template: FormTemplateDefinition<U>): U =>
    Object.values(template).reduce((acc, input) => {
      const defaultValues: Record<string, string | number | boolean> = {};

      if (input.type === "checkbox" && input.defaultFieldValue) {
        const defaultValue = findNestedFieldValue(
          data as Record<string, string>,
          input?.fieldName,
          input?.nestingKey
        );
        defaultValues[input?.queryCustomFieldName ?? input?.fieldName] =
          _.isNil(defaultValue)
            ? (input.defaultFieldValue as boolean)
            : defaultValue;
      } else if (input.subFields) {
        return {
          ...acc,
          [input.fieldName]: generateFormValues(input.subFields),
        };
      } else {
        const defaultValueField: string = input?.queryCustomFieldName
          ? input.queryCustomFieldName
          : input.fieldName;

        const defaultValue = findNestedFieldValue(
          data as Record<string, string>,
          defaultValueField,
          input?.nestingKey
        );

        defaultValues[input.fieldName] =
          defaultValue ?? input.defaultFieldValue ?? "";
      }

      return {
        ...acc,
        ...(defaultValues as U),
      };
    }, {}) as U;

  return generateFormValues(template);
};

export const generateMutationDataInput = <T>(
  data: T,
  mutationFields: string[]
) =>
  mutationFields.reduce((acc, field) => {
    return { ...acc, [field]: data?.[field as keyof T] };
  }, []);

export const generateFormData = <U extends {}>(
  formTemplate: FormTemplateDefinition<U>,
  data: U
) =>
  Object.values(formTemplate)
    .filter((element) => !element.excludeFromMutation)
    .reduce((acc, input) => {
      const formInputValues: Record<
        string,
        string | number | boolean | unknown
      > = {};
      formInputValues[input?.customFieldName ?? input.fieldName] =
        data[input.fieldName as unknown as keyof U];

      return {
        ...acc,
        ...(formInputValues as U),
      };
    }, {});
