import {
  FieldValues,
  UseFormTrigger,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export type Constraints = {
  max?: number;
  min?: number;
  // Add more properties as needed
};

export type FormTemplateSubFieldsType = {
  [key: string]: {
    fieldName: string;
    label: string;
    type: "checkbox" | "input" | "date" | "react-element";
    defaultFieldValue?: string | boolean | number;
    i18nIdentifier?: string;
    excludeFromMutation?: boolean;
    nested?: true;
    nestingKey?: string;
    disabled?: boolean;
  };
};

export type FormTemplateDefinitionInputType<U extends FieldValues> = {
  fieldName: string;
  label: string;
  groupLabel?: ({
    input,
    props,
  }: {
    input: FormTemplateDefinitionInputType<U>;
    [key: string]: string | unknown;
  }) => JSX.Element;
  type: "checkbox" | "input" | "date" | "react-element" | "group" | "textarea";
  customFieldName?: string;
  queryCustomFieldName?: string;
  constraints?: Constraints;
  defaultFieldValue?: string | boolean | number;
  i18nIdentifier?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  nested?: boolean;
  nestingKey?: string;
  excludeFromMutation?: boolean;
  inputClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
  groupClassName?: string;
  labelRequiredClassName?: string;
  errorTextClassName?: string;
  labelRequired?: boolean;
  element?:
    | JSX.Element
    | ((
        trigger?: UseFormTrigger<U>,
        erros?: FieldErrors<U>,
        props?: {
          [key: string]: unknown;
        }
      ) => JSX.Element);
  subFields?: FormTemplateSubFieldsType;
  customGroupBehaviour?: ({
    getValues,
    input,
    setValue,
    watch,
  }: {
    getValues: UseFormGetValues<U> | undefined;
    input: FormTemplateDefinitionInputType<U> | undefined;
    setValue: UseFormSetValue<U>;
    watch?: UseFormWatch<U>;
    touchedFields?: U;
  }) => void;
};

export type FormTemplateDefinition<U extends FieldValues> = {
  [key: string]: FormTemplateDefinitionInputType<U>;
};
