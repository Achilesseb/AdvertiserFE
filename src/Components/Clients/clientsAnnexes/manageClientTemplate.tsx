import { FormTemplateDefinition } from "@/Components/form/formTemplate";

export type FormFieldsTemplate = {
  name: string;
  label: string;
  defaultValue: string | boolean | number;
  type: "input" | "checkbox" | "select";
};

export type ClientsFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: boolean;
  cui: string;
};

export const clientsNewFormTemplate: FormTemplateDefinition<ClientsFormData> = {
  name: {
    fieldName: "name",
    label: "Client name",
    type: "input",
    containerClassName: "w-full relative z-30",
    constraints: {
      max: 200,
      min: 5,
    },
    errorTextClassName:
      "absolute text-error-40 left-0 bottom-0  text-labelSmall block text-right",
  },
  email: {
    fieldName: "contactEmail",
    label: "Client email",
    type: "input",
    labelRequiredClassName: "text-neutral-60",
    customFieldName: "contactEmail",
    constraints: {
      max: 500,
      min: 15,
    },
  },

  phone: {
    fieldName: "phone",
    label: "Phone number",
    type: "input",
    labelRequiredClassName: "text-neutral-60",
    constraints: {
      max: 500,
      min: 15,
    },
  },
  address: {
    fieldName: "address",
    label: "Address",
    type: "input",
    labelRequiredClassName: "text-neutral-60",
    constraints: {
      max: 500,
      min: 15,
    },
  },
  city: {
    fieldName: "city",
    label: "City",
    type: "input",
    containerClassName: "w-full relative z-10",
    constraints: {
      max: 200,
      min: 5,
    },
  },
  cui: {
    fieldName: "cui",
    label: "CUI",
    type: "input",
    containerClassName: "w-full relative z-10",
    constraints: {
      max: 200,
      min: 5,
    },
  },
};
