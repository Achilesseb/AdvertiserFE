import { createColumnHelper } from "@tanstack/react-table";

export type ClientReportsModel = {
  id: string;
  name: string;
  promotionNumber: number;
  tripsNumber: number;
  totalKilometers: number;
};

export type PromotionsReportsModel = {
  promotionsId: string;
  totalDistance: number;
  clientId: string;
  title: number;
  trips: number;
  name: string;
};

const clientsReportsColumnHelper = createColumnHelper<ClientReportsModel>();

export const defaultClientReportsColumns = [
  clientsReportsColumnHelper.accessor("name", {
    header: "Client Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  clientsReportsColumnHelper.accessor("promotionNumber", {
    header: "Number of promotions",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  clientsReportsColumnHelper.accessor("tripsNumber", {
    header: "Trips number",
    cell: (info) => `${info.getValue()} trips`,
    footer: (info) => info.column.id,
  }),
  clientsReportsColumnHelper.accessor("totalKilometers", {
    header: "Total distance",
    cell: (info) => `${info.getValue()} kilometers`,
    footer: (info) => info.column.id,
  }),
];

const clientsPromotionsReportsColumnHelper =
  createColumnHelper<PromotionsReportsModel>();

export const defaultClientPromotionsReportsColumns = [
  clientsPromotionsReportsColumnHelper.accessor("name", {
    header: "Client Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  clientsPromotionsReportsColumnHelper.accessor("title", {
    header: "Promotion title",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  clientsPromotionsReportsColumnHelper.accessor("trips", {
    header: "Trips number",
    cell: (info) => `${info.getValue()} trips`,
    footer: (info) => info.column.id,
  }),
  clientsPromotionsReportsColumnHelper.accessor("totalDistance", {
    header: "Total distance",
    cell: (info) => `${info.getValue()} kilometers`,
    footer: (info) => info.column.id,
  }),
];

export const generateClientsReportsTableHeaderElements = {
  searchInput: {
    type: "input",
    inputPlaceHolder: "Search after client name",
    styleModifiers:
      "col-start-1 col-end-3 w-full border-2 rounded-md border-neutral-60 text-center hover:border-primary-60  focus:border-primary-60 focus-ring mb-4",
  },
};

export const generateClientsPromotionsReportsTableHeaderElements = {
  searchInput: {
    type: "input",
    inputPlaceHolder: "Search after promotion title",
    styleModifiers:
      "col-start-1 col-end-3 w-full border-2 rounded-md border-neutral-60 text-center hover:border-primary-60  focus:border-primary-60 focus-ring mb-4",
  },
};
