import {
  FormTemplateDefinition,
  FormTemplateDefinitionInputType,
  FormTemplateSubFieldsType,
} from "../formTemplate";
import {
  FieldValues,
  ControllerRenderProps,
  Path,
  FieldErrors,
  Control,
  UseFormSetValue,
  UseFormGetValues,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

export type FormDefaultInputPropTypes<U extends FieldValues> = {
  formTemplate: FormTemplateDefinition<U>;
  input: FormTemplateDefinitionInputType<U>;
  field: ControllerRenderProps<U, Path<U>>;
  errors: FieldErrors<U>;
  [key: string]: unknown;
};

export type InputDateComponentPropTypes<T extends {}, U extends FieldValues> = {
  formTemplate: FormTemplateDefinition<U>;
  input: FormTemplateDefinitionInputType<U>;
  field: ControllerRenderProps<U, Path<U>>;
  errors: FieldErrors<U>;
  data: T;
  [key: string]: string | unknown;
};

export type InputCheckboxComponentPropTypes<
  T extends {},
  U extends FieldValues
> = {
  input: FormTemplateDefinitionInputType<U>;
  field: ControllerRenderProps<U, Path<U>>;
  [key: string]: unknown;
};

export type FormDefaultInputsPropTypes<T extends {}, U extends FieldValues> = {
  formTemplate: FormTemplateDefinition<U>;
  input: FormTemplateDefinitionInputType<U>;
  errors: FieldErrors<U>;
  getFieldName: (value: string) => Path<U>;
  data: T;
  control: Control<U>;
  [key: string]: unknown;
};

export type FormCustomInputPropTypes<U extends FieldValues> = {
  input: FormTemplateDefinitionInputType<U>;
  control: Control<U>;
  setValue?: UseFormSetValue<U>;
  dirtyFields?: U;
  touchedFields?: U;
  getValues?: UseFormGetValues<U>;
  formTrigger: UseFormTrigger<U>;
  errors: FieldErrors<U>;
  [key: string]: string | unknown;
};

export type FormInputsPropTypes<T extends {}, U extends FieldValues> = {
  formTemplate: FormTemplateDefinition<U> | FormTemplateSubFieldsType;
  control: Control<U>;
  watch?: UseFormWatch<U>;
  errors: FieldErrors<U>;
  data: T;
  formTrigger: UseFormTrigger<U>;
  setValue: UseFormSetValue<U>;
  parrentElement?: string;
  getValues?: UseFormGetValues<U>;
  touchedFields?: U;
  dirtyFields?: U;
  input?: FormTemplateDefinitionInputType<U>;
};

export type InputTextAreaPropTypes<U extends FieldValues> = {
  input: FormTemplateDefinitionInputType<U>;
  field: ControllerRenderProps<U, Path<U>>;
  formTemplate: FormTemplateDefinition<U> | FormTemplateSubFieldsType;
  errors: FieldErrors<U>;
  [key: string]: string | boolean | number | unknown;
};
