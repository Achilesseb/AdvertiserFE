import { TableHeaderElement } from "@/Components/Table/TableHeader";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import {
  AiOutlineAntDesign,
  AiOutlineCar,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlinePhone,
} from "react-icons/ai";
export type UserModel = {
  id: string;
  address: string;
  registrationPlate: string;
  city: string;
  name: string;
  phone: string;
  team: string;
  email: string;
  car: string;
  tabletId: string;
  tablets: number;
  role: string;
  createdAt: string;
  teamName: string;
};

export type DeviceModel = {
  id: string;
  createdAt: string;
  system: string;
  location: string;
  inUse: boolean;
  driver: UserModel;
  identificator: string;
  teamName: string;
};

const columnHelper = createColumnHelper<UserModel>();

const driversDefaultColumns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("city", {
    header: "City",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
    cell: (info) => (
      <div className="flex gap-2 items-center">
        <AiOutlinePhone color="#008000" />
        {info.getValue()}
      </div>
    ),

    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("car", {
    header: "Car",
    cell: (info) => (
      <div className="flex gap-2 items-center">
        <AiOutlineCar color="#008000" />
        {info.getValue()}
      </div>
    ),

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
  columnHelper.accessor("teamName", {
    id: "teamName",
    header: "Team",
    cell: (info) => <i>{info.getValue()}</i>,
    footer: (info) => info.column.id,
  }),
];

export const generateDriversTableHeaderElements = (
  router: AppRouterInstance
): Record<string, TableHeaderElement> => ({
  searchInput: {
    type: "input",
    inputPlaceHolder: "Search after city name",
    styleModifiers:
      "col-start-1 col-end-4 w-full border-2 rounded-md border-neutral-60 px-4 py-2 text-xl text-center hover:border-primary-60  focus:border-primary-60 focus-ring",
  },
  addNew: {
    type: "button",
    buttonText: "Add new driver",
    style: "filled",
    onClick: () => router.push("/drivers/newDriver"),
    styleModifiers: "col-start-5 col-end-9",
  },
  delete: {
    type: "button",
    buttonText: "Delete",
    style: "outlined",
    styleModifiers: "col-start-9 col-end-11",
  },
});

export const generateTeamPromotionsTableHeaderElements = (
  router: AppRouterInstance
): Record<string, TableHeaderElement> => ({
  searchInput: {
    type: "input",
    inputPlaceHolder: "Search after promotion title",
    styleModifiers:
      "col-start-1 col-end-3 w-full border-2 rounded-md border-neutral-60 text-center hover:border-primary-60  focus:border-primary-60 focus-ring",
  },
  addNew: {
    type: "button",
    buttonText: "Add new ",
    style: "filled",
    styleModifiers: "col-start-5 col-end-9  ",
  },
  delete: {
    type: "button",
    buttonText: "Delete",
    style: "outlined",
    styleModifiers: "col-start-9 col-end-11",
  },
});
export default driversDefaultColumns;
