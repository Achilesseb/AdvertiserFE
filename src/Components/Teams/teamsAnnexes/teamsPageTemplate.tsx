import { TableHeaderElement } from "@/Components/Table/TableHeader";
import { secondsToHms } from "@/utils/videoDuration";
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
  totalDuration: number;
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
        className="truncate flex justify-center items-center"
        title={info.getValue()}
      >
        {info
          .getValue()
          ?.split(",")
          .filter((_value, index) => index < 3)
          .join(",")}
        ...
      </p>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("totalDrivers", {
    header: "Number of drivers",
    cell: (info) => info.getValue() ?? 0,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("totalDuration", {
    header: "Total video time",
    cell: (info) => (
      <div className="flex justify-center items-center gap-1">
        <AiOutlineFieldTime color="#008000" />
        {secondsToHms(info.getValue() ?? 0)}
      </div>
    ),

    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("totalPromotions", {
    header: "Promotions",
    cell: (info) => (
      <div className="flex justify-center items-center gap-1">
        {info.getValue() ?? 0}
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
      "col-start-1 col-end-4 w-full text-xl px-4 py-2 border-2 rounded-md border-neutral-60 text-center hover:border-primary-60  focus:border-primary-60 focus-ring",
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
