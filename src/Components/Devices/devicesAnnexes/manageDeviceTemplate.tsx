import { FormTemplateDefinition } from "@/Components/form/formTemplate";

export type FormFieldsTemplate = {
  name: string;
  label: string;
  defaultValue: string | boolean | number;
  type: "input" | "checkbox" | "select";
};

export type DevicesFormData = {
  driver: string;
  identifier: string;
  location: string;
  system: string;
  inUse: boolean;
  team: string;
};

export const deviceNewFormTemplate: FormTemplateDefinition<DevicesFormData> = {
  driver: {
    fieldName: "name",
    nested: true,
    disabled: true,
    nestingKey: "driver",
    label: "Driver name",
    type: "input",
    containerClassName: "w-full relative z-30",
    i18nIdentifier: "driver-name",
    constraints: {
      max: 200,
      min: 5,
    },
    excludeFromMutation: true,
    errorTextClassName:
      "absolute text-error-40 left-0 bottom-0  text-labelSmall block text-right",
  },
  identifier: {
    fieldName: "identifier",
    label: "Device identifier",
    type: "input",
    labelRequiredClassName: "text-neutral-60",
    i18nIdentifier: "service-details",

    constraints: {
      max: 500,
      min: 15,
    },
  },

  location: {
    fieldName: "location",
    label: "Location",
    type: "input",
    labelRequiredClassName: "text-neutral-60",
    i18nIdentifier: "service-details",

    constraints: {
      max: 500,
      min: 15,
    },
  },
  system: {
    fieldName: "system",
    label: "Device system",
    type: "input",

    labelRequiredClassName: "text-neutral-60",
    i18nIdentifier: "service-details",
    constraints: {
      max: 500,
      min: 15,
    },
  },
  inUse: {
    fieldName: "inUse",
    label: "Device in use",
    type: "checkbox",
    containerClassName: "w-full relative z-10",
    disabled: false,
    excludeFromMutation: false,
    defaultFieldValue: false,
    i18nIdentifier: "frequency",
    constraints: {
      max: 200,
      min: 5,
    },
  },
};
