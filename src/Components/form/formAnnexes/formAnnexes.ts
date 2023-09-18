import { Dispatch, SetStateAction, ReactNode } from "react";
import { FieldValues, FieldErrors, UseFormReset } from "react-hook-form";
import { FormTemplateDefinition } from "../formTemplate";

export type FormSectionPropTypes<DataType> = {
  data: DataType;
  queryKey: string;
  sectionTitle?: string;
  sectionTitleDataKey?: string;
};

export type ModalStyleType = {
  leavePageButtonStyle?: {
    modifiers?: "string";
    filled?: "text" | "filled" | "outlined" | "elevated" | "tonal";
  };
  cancelPageButtonStyle?: {
    modifiers?: "string";
    filled?: "text" | "filled" | "outlined" | "elevated" | "tonal";
  };
  overflowOptions?: string;
  modalButtonModifier?: string;
};
export type FormModalComponentPropTypes = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  leavePageFunction: () => void;
  modalStyles?: ModalStyleType;
};

export type InputErrorPropTypes<U extends FieldValues> = {
  errors: FieldErrors<U>;
  field: string;
  formTemplate: FormTemplateDefinition<U>;
  errorTextModifierStyles?: string;
};

export type FormButtonsModifiers = {
  buttonsContainerStyle?: string;
  submitButtonStyle?: {
    modifiers: string;
    filled?: "text" | "filled" | "outlined" | "elevated" | "tonal" | "dirty";
  };
  cancelButtonStyle?: {
    modifiers: string;
    filled?: "text" | "filled" | "outlined" | "elevated" | "tonal" | "dirty";
  };
  modalStyle?: ModalStyleType;
};

export type FormFunnyButtonsPropTypes<T extends FieldValues> = {
  children?: ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isDirty?: boolean;
  reset?: UseFormReset<T>;
  hasBackButton?: boolean;
  hasNextButton?: boolean;
  nextButtonFunction?: () => void;
  backButtonFunction: () => void;
  buttonsStyleModifier?: FormButtonsModifiers;
};

export type EWFormTitleProps = {
  generateCustomSectionButtons?: () => JSX.Element | null;
  [key: string]: string | unknown;
};
