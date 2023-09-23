import { UserModel } from "@/Components/Drivers/AllDriversPage";
import { FormTemplateDefinition } from "@/Components/form/formTemplate";
import { createColumnHelper } from "@tanstack/react-table";
import { AiOutlineAntDesign } from "react-icons/ai";

export type FormFieldsTemplate = {
  name: string;
  label: string;
  defaultValue: string | boolean | number;
  type: "input" | "checkbox" | "select";
};

export type TeamsFormData = {
  name: string;
  city: string;
};

export type TeamsPromotionsView = {
  id: string;
  title: string;
  fileName: string;
  teamId: string;
  name: string;
};

export const teamsFormTemplate: FormTemplateDefinition<TeamsFormData> = {
  name: {
    fieldName: "teamName",
    customFieldName: "name",
    label: "Team name",
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
  city: {
    fieldName: "city",
    label: "City",
    type: "input",
    inputClassName: "col-span-1",
    constraints: {
      max: 500,
      min: 15,
    },
  },
};

const columnHelper = createColumnHelper<UserModel>();
export const teamDriversColumns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("registrationPlate", {
    header: "Plate",
    cell: (info) => (
      <div className="flex gap-2 items-center">
        <AiOutlineAntDesign color="#008000" />
        {info.getValue()}
      </div>
    ),

    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: "Email",
    cell: (info) => <i>{info.getValue()}</i>,
    footer: (info) => info.column.id,
  }),
];

const columnHelperPromos = createColumnHelper<TeamsPromotionsView>();

export const teamPromotionsColumns = [
  columnHelperPromos.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelperPromos.accessor("title", {
    header: "Title",
    cell: (info) => (
      <div className="flex gap-2 items-center">
        <AiOutlineAntDesign color="#008000" />
        {info.getValue()}
      </div>
    ),

    footer: (info) => info.column.id,
  }),
];
