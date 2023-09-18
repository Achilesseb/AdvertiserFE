import { FormTemplateDefinition } from "@/Components/form/formTemplate";

export type FormFieldsTemplate = {
  name: string;
  label: string;
  defaultValue: string | boolean | number;
  type: "input" | "checkbox" | "select";
};

export type UsersFormData = {
  address: string;
  registrationPlate: string;
  city: string;
  name: string;
  phone: string;
  team: string;
  email: string;
  carDetails: string;
  deviceId: string;
  teamId: string;
};

export const driversNewFormTemplate: FormTemplateDefinition<UsersFormData> = {
  name: {
    fieldName: "name",
    nested: true,
    label: "Driver name",
    labelRequired: true,
    type: "input",
    containerClassName: "w-full relative z-30",
    constraints: {
      max: 200,
      min: 5,
    },
    errorTextClassName:
      "absolute text-error-40 left-0 bottom-0  text-labelSmall block text-right",
  },
  phone: {
    fieldName: "phone",
    label: "Phone number",
    type: "input",
    labelRequiredClassName: "text-neutral-60",
    inputClassName: "col-span-1",
    labelRequired: true,
    constraints: {
      max: 500,
      min: 15,
    },
  },

  email: {
    fieldName: "email",
    label: "Email",
    type: "input",
    labelRequiredClassName: "text-neutral-60",
    labelRequired: true,
    constraints: {
      max: 500,
      min: 15,
    },
  },
  city: {
    fieldName: "city",
    label: "Driver city",
    type: "input",
    labelRequiredClassName: "text-neutral-60",
    constraints: {
      max: 500,
      min: 15,
    },
  },
  car: {
    fieldName: "car",
    label: "Driver car",
    type: "input",
    containerClassName: "w-full relative z-10",
    constraints: {
      max: 200,
      min: 5,
    },
  },
  registrationPlate: {
    fieldName: "registrationPlate",
    label: "Driver registration plate",
    type: "input",
    containerClassName: "w-full relative z-10",
    constraints: {
      max: 200,
      min: 5,
    },
  },
  address: {
    fieldName: "address",
    label: "Driver address",
    type: "input",
    containerClassName: "w-full relative z-10",
    constraints: {
      max: 200,
      min: 5,
    },
  },
};
