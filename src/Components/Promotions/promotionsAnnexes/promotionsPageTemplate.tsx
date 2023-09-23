import { ClientModel } from "@/Components/Clients/clientsAnnexes/clientsPageTemplate";
import { TableHeaderElement } from "@/Components/Table/TableHeader";
import { createColumnHelper } from "@tanstack/react-table";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { AiOutlineFieldTime } from "react-icons/ai";

type PromotionModel = {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number;
  category: string;
  fileName: string;
  clients: ClientModel;
};

const columnHelper = createColumnHelper<PromotionModel>();

const defaultPromotionsColumns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("url", {
    header: "Visit page",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("duration", {
    header: "Duration",
    cell: (info) => (
      <div className="flex justify-center items-center gap-1">
        <AiOutlineFieldTime color="#008000" />
        {info.getValue()} secunde
      </div>
    ),

    footer: (info) => info.column.id,
  }),
];

export const generatePromotionsTableHeaderElements = (
  router: AppRouterInstance
): Record<string, TableHeaderElement> => ({
  searchInput: {
    type: "input",
    inputPlaceHolder: "Search after title name",
    styleModifiers:
      "col-start-1 col-end-3 w-full border-2 rounded-md border-neutral-60 text-center hover:border-primary-60  focus:border-primary-60 focus-ring",
  },
  addNew: {
    type: "button",
    buttonText: "Add new promotion",
    style: "filled",
    styleModifiers: "col-start-7 col-end-9 px-2",
  },
  delete: {
    type: "button",
    buttonText: "Delete",
    style: "outlined",
    styleModifiers: "col-start-9 col-end-11",
  },
});
export default defaultPromotionsColumns;
