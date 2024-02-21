import { createColumnHelper } from "@tanstack/react-table";

const clientsReportsColumnHelper = createColumnHelper<ClientReportsModel>();
const driversReportsColumnHelper = createColumnHelper<DriversReportsModel>();

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

export const defaultDriversReportsColumns = [
  driversReportsColumnHelper.accessor("driverName", {
    header: "Driver Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  driversReportsColumnHelper.accessor("car", {
    header: "Car",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  driversReportsColumnHelper.accessor("trips", {
    header: "Trips number",
    cell: (info) => `${info.getValue()} trips`,
    footer: (info) => info.column.id,
  }),
  driversReportsColumnHelper.accessor("totalDistance", {
    header: "Total distance",
    cell: (info) => `${info.getValue()} kilometers`,
    footer: (info) => info.column.id,
  }),
  driversReportsColumnHelper.accessor("fleet", {
    header: "Fleet",
    cell: (info) => {
      return info.getValue();
    },
    footer: (info) => info.column.id,
  }),
];

export const defaultUniqueDriverReportsColumns = [
  driversReportsColumnHelper.accessor("driverName", {
    header: "Driver Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  driversReportsColumnHelper.accessor("car", {
    header: "Car",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  driversReportsColumnHelper.accessor("trips", {
    header: "Trips number",
    cell: (info) => `${info.getValue()} trips`,
    footer: (info) => info.column.id,
  }),
  driversReportsColumnHelper.accessor("totalDistance", {
    header: "Total distance",
    cell: (info) => `${info.getValue()} kilometers`,
    footer: (info) => info.column.id,
  }),
  driversReportsColumnHelper.accessor("fleet", {
    header: "Fleet",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  driversReportsColumnHelper.accessor("day", {
    header: "Activity Day",
    cell: (info) => info.getValue(),
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

export const generateClientsReportsTableHeaderElements = (entity: string) => ({
  searchInput: {
    type: "input",
    inputPlaceHolder:
      entity === "clients"
        ? "Search after client name"
        : "Search after driver name",
    styleModifiers:
      "col-start-1 col-end-5 px-4 py-2 text-xl border-2 rounded-md border-neutral-60 text-center hover:border-primary-60  focus:border-primary-60 focus-ring mb-4",
  },
});

export const generateClientsPromotionsReportsTableHeaderElements = {
  searchInput: {
    type: "input",
    inputPlaceHolder: "Search after promotion title",
    styleModifiers:
      "col-start-1 col-end-3 px-6 py-2 text-xl w-full border-2 rounded-md border-neutral-60 text-center hover:border-primary-60  focus:border-primary-60 focus-ring mb-4",
  },
};

export type ClientReportsModel = {
  id: string;
  name: string;
  promotionNumber: number;
  tripsNumber: number;
  totalKilometers: number;
};

export type DriversReportsModel = {
  userId: string;
  driverName: string;
  trips: number;
  totalDistance: number;
  fleet: string;
  car: string;
  day?: string;
};

export type PromotionsReportsModel = {
  promotionsId: string;
  totalDistance: number;
  clientId: string;
  title: number;
  trips: number;
  name: string;
};
