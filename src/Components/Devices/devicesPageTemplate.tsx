import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";

export type UserModel = {
  id: string;
  address: string;
  registrationPlate: string;
  city: string;
  name: string;
  phone: string;
  team: string;
  email: string;
  carDetails: string;
  tabletId: string;
  tablets: number;
  role: string;
  createdAt: string;
};

export type DeviceModel = {
  id: string;
  createdAt: string;
  system: string;
  location: string;
  inUse: boolean;
  driver: UserModel;
  identificator: string;
};

const columnHelper = createColumnHelper<DeviceModel>();

const defaultColumns = [
  columnHelper.accessor("id", {
    header: "Tablet Id",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("system", {
    header: "System",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    header: "Location",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("inUse", {
    header: "In Use",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
    footer: (info) => info.column.id,
  }),
  // Assuming UserModel has a property called 'lastName'
  columnHelper.accessor((row) => row.driver.name, {
    id: "Name",
    header: "Driver",
    cell: (info) => <i>{info.getValue()}</i>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("identificator", {
    header: "Identifier",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => dayjs(info.getValue()).format("DD-MM-YYYY"),
    footer: (info) => info.column.id,
  }),
];

export default defaultColumns;
