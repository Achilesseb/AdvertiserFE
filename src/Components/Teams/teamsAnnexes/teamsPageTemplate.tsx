import { TableHeaderElement } from "@/Components/Table/TableHeader";
import { createColumnHelper } from "@tanstack/react-table";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { AiOutlineFieldTime } from "react-icons/ai";

export type TeamsModel = {
  id: string;
  city: string;
  teamName: string;
  createdAt: string;
  totalDrivers: number;
  drivers: string;
  totalPromotions: number;
  totalDurations: number;
};

const columnHelper = createColumnHelper<TeamsModel>();

const defaultTeamsColumn = [
  columnHelper.accessor("teamName", {
    header: "Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("city", {
    header: "City",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("drivers", {
    header: "Drivers",
    cell: (info) => (
      <p
        className="w-12/12 truncate flex justify-center items-center"
        title={info.getValue()}
      >
        {info.getValue()}
      </p>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("totalDrivers", {
    header: "Number of drivers",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("totalDurations", {
    header: "Total video time",
    cell: (info) => (
      <div className="flex justify-center items-center gap-1">
        <AiOutlineFieldTime color="#008000" />
        {info.getValue()} secunde
      </div>
    ),

    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("totalPromotions", {
    header: "Promotions",
    cell: (info) => (
      <div className="flex justify-center items-center gap-1">
        {info.getValue()}
      </div>
    ),

    footer: (info) => info.column.id,
  }),
];

export const generateTeamsTableHeaderElements = (
  router: AppRouterInstance
): Record<string, TableHeaderElement> => ({
  searchInput: {
    type: "input",
    inputPlaceHolder: "Search after team name",
    styleModifiers:
      "col-start-1 col-end-3 w-full border-2 rounded-md border-neutral-60 text-center hover:border-primary-60  focus:border-primary-60 focus-ring",
  },
  addNew: {
    type: "button",
    buttonText: "Add new team",
    style: "filled",
    styleModifiers: "col-start-7 col-end-9 px-2",
    onClick: () => router.push("/teams/newTeam"),
  },
  delete: {
    type: "button",
    buttonText: "Delete",
    style: "outlined",
    styleModifiers: "col-start-9 col-end-11",
  },
});
export default defaultTeamsColumn;
