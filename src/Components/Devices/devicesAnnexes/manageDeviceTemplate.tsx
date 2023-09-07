export type FormFieldsTemplate = {
  name: string;
  label: string;
  defaultValue: string | boolean | number;
  type: "input";
};

export const deviceTemplate: FormFieldsTemplate[] = [
  {
    name: "driverId",
    type: "input",
    label: "Driver",
    defaultValue: "",
  },
  {
    name: "identifier",
    label: "Identifier",
    type: "input",
    defaultValue: "",
  },
  {
    name: "inUse",
    label: "Active",
    type: "input",
    defaultValue: false,
  },
  {
    name: "location",
    label: "City",
    type: "input",
    defaultValue: "Cluj-Napoca",
  },
  {
    name: "system",
    label: "Operating System",
    type: "input",
    defaultValue: "Pixel 20",
  },
];
