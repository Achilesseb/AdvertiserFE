"use Client";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";

import {
  defaultClientPromotionsReportsColumns,
  defaultUniqueDriverReportsColumns,
  generateClientsPromotionsReportsTableHeaderElements,
} from "./reportsAnnexes/reportsPage";

import { TableHeaderElement } from "../Table/TableHeader";
import {
  GET_CLIENTS_PROMOTIONS_REPORTS,
  GET_UNIQUE_DRIVER_REPORTS,
} from "@/graphql/schemas/reportsSchema";
import { ColumnDefBase } from "@tanstack/react-table";
import { ClientModel } from "../Clients/clientsAnnexes/clientsPageTemplate";
import { TableComponent } from "../Table/Table";
import { DateSelection } from "./AllClientsReportsPage";
import { DatePickerComponent } from "../DatePickerComponent";

export const UniqueReportsPage = ({
  clientId,
  entity,
  driverId,
}: {
  entity: string;
  clientId?: string;
  driverId?: string;
}) => {
  const overallEntityCondition = entity === "clients";
  const [selectedDateRange, setSelectedDateRange] = useState<DateSelection>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [nameFilter, setNameFilter] = useState<string>("");
  const defaultPromotionFilters = {
    ...(clientId && { clientId }),
    ...(driverId && { driverId }),
    ...(nameFilter && { title: nameFilter }),
    ...(selectedDateRange?.startDate && {
      startDate: new Date(
        selectedDateRange.startDate.toISOString()
      ).toDateString(),
    }),
    ...(selectedDateRange?.endDate && {
      endDate: new Date(selectedDateRange.endDate.toISOString()).toDateString(),
    }),
  };

  const clientsTableHeaderElements =
    generateClientsPromotionsReportsTableHeaderElements;

  const polishedClientsReportsTableHeaderElements = {
    ...(overallEntityCondition && {
      searchInput: {
        ...clientsTableHeaderElements.searchInput,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          setNameFilter(event.target.value as string),
      },
    }),
  } as Record<string, TableHeaderElement>;

  return (
    <div className="border-b-4 border-l-2 rounded-md border-neutral-80 shadow-lg laptop:p-20 flex tablet:flex-col gap-10 justify-center tablet:px-2 tablet:py-4  min-h-full">
      <DatePickerComponent
        setSelectedDateRange={setSelectedDateRange}
        selectedDateRange={selectedDateRange}
      />
      <TableComponent<ClientModel>
        polishedHeaderElements={polishedClientsReportsTableHeaderElements}
        rowsClickable={false}
        headerData={
          overallEntityCondition ? "Promotions reports" : "Driver reports"
        }
        apolloQuery={
          overallEntityCondition
            ? GET_CLIENTS_PROMOTIONS_REPORTS
            : GET_UNIQUE_DRIVER_REPORTS
        }
        columns={
          overallEntityCondition
            ? (defaultClientPromotionsReportsColumns as unknown as Array<
                ColumnDefBase<ClientModel, string>
              >)
            : (defaultUniqueDriverReportsColumns as unknown as Array<
                ColumnDefBase<ClientModel, string>
              >)
        }
        filters={defaultPromotionFilters}
      />
    </div>
  );
};
