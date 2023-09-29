import { TableHeaderElement } from "@/Components/Table/TableHeader";
import { createColumnHelper } from "@tanstack/react-table";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { AiOutlineHome, AiOutlinePhone } from "react-icons/ai";

export type ClientModel = {
  id: string;
  name: string;
  contactEmail: string;
  phone: string;
  address: string;
  cui: string;
  city: string;
  createdAt: string;
  totalPromotions: number;
  promotions: string;
};

const columnHelper = createColumnHelper<ClientModel>();

const defaultClientsColumns = [
  columnHelper.accessor("name", {
    header: "Client name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("contactEmail", {
    header: "Email",
    cell: (info) => (
      <span className="flex justify-start items-center">{info.getValue()}</span>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("phone", {
    header: "Phone number",
    cell: (info) => (
      <div className="flex items-center gap-2 justify-center">
        <AiOutlinePhone color="#008000" />
        <div className="truncate w-20">
          <span title={info.getValue()}>{info.getValue()}</span>
        </div>
      </div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("address", {
    header: "Address",
    cell: (info) => (
      <div className="flex items-center gap-2 justify-center">
        <AiOutlineHome color="#008000" />
        <div className="truncate w-20">
          <span title={info.getValue()}>{info.getValue()}</span>
        </div>
      </div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("city", {
    header: "City",
    cell: (info) => (
      <div className="flex items-center gap-4 justify-center">
        {info.getValue()}
      </div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("cui", {
    header: "CUI",
    cell: (info) => (
      <div className="flex items-center gap-4 justify-center">
        {info.getValue()}
      </div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("totalPromotions", {
    header: "Promotions",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("promotions", {
    header: "Titles",
    cell: (info) => (
      <div className="truncate max-w-[14vw] flex items-center justify-start">
        <span title={info.getValue()}>{info.getValue()}</span>
      </div>
    ),
    footer: (info) => info.column.id,
  }),
];

export const generateClientsTableHeaderElements = (
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
    buttonText: "Add new client",
    style: "filled",
    styleModifiers: "col-start-7 col-end-9",
    onClick: () => router.push("/clients/newClient"),
  },
  delete: {
    type: "button",
    buttonText: "Delete",
    style: "outlined",
    styleModifiers: "col-start-9 col-end-11",
  },
});

export default defaultClientsColumns;
