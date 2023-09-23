import { TableHeaderElement } from "@/Components/Table/TableHeader";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const columnHelper = createColumnHelper<DeviceModel>();

const defaultDevicesColumns = [
  columnHelper.accessor("identifier", {
    header: "Device",
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
    cell: (info) =>
      info.getValue() ? (
        <div className="flex justify-center">
          <AiOutlineCheck color="#008000" />
        </div>
      ) : (
        <div className="flex justify-center">
          <AiOutlineClose color="#FF0000" />
        </div>
      ),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor((row) => row.driver?.name, {
    id: "Name",
    header: "Driver",
    cell: (info) => <i>{info.getValue()}</i>,
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => dayjs(info.getValue()).format("DD-MM-YYYY"),
    footer: (info) => info.column.id,
  }),
];

export const generateDeviceTableHeaderElements = (
  router: AppRouterInstance
): Record<string, TableHeaderElement> => ({
  searchInput: {
    type: "input",
    inputPlaceHolder: "Search after city name",
    styleModifiers:
      "col-start-1 col-end-3 w-full border-2 rounded-md border-neutral-60 text-center hover:border-primary-60  focus:border-primary-60 focus-ring",
  },
  addNew: {
    type: "button",
    buttonText: "Add new device",
    style: "filled",
    styleModifiers: "col-start-7 col-end-9",
    onClick: () => router.push("/devices/newDevice"),
  },
  delete: {
    type: "button",
    buttonText: "Delete",
    style: "outlined",
    styleModifiers: "col-start-9 col-end-11",
  },
});
export default defaultDevicesColumns;

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
  identifier: string;
  createdAt: string;
  system: string;
  location: string;
  inUse: boolean;
  driver: UserModel;
  identificator: string;
};
