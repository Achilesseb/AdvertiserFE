"use Client";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  defaultClientReportsColumns,
  generateClientsReportsTableHeaderElements,
} from "./reportsAnnexes/reportsPage";

import { TableHeaderElement } from "../Table/TableHeader";
import { GET_CLIENTS_REPORTS } from "@/graphql/schemas/reportsSchema";
import { ColumnDefBase } from "@tanstack/react-table";
import { ClientModel } from "../Clients/clientsAnnexes/clientsPageTemplate";
import { TableComponent } from "../Table/Table";
import { RangeKeyDict, DateRange, DefinedRange } from "react-date-range";
import { DatePickerComponent } from "../DatePickerComponent";

export type DateSelection = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export const AllClientsReportsPage = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateSelection>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [nameFilter, setNameFilter] = useState<string>("");
  const defaultPromotionFilters = {
    ...(nameFilter && { name: nameFilter }),
    ...(selectedDateRange?.startDate && {
      startDate: new Date(
        selectedDateRange.startDate.toISOString()
      ).toDateString(),
    }),
    ...(selectedDateRange?.endDate && {
      endDate: new Date(selectedDateRange.endDate.toISOString()).toDateString(),
    }),
  };

  const clientsTableHeaderElements = generateClientsReportsTableHeaderElements;

  const polishedClientsReportsTableHeaderElements = {
    searchInput: {
      ...clientsTableHeaderElements.searchInput,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setNameFilter(event.target.value as string),
    },
  } as Record<string, TableHeaderElement>;

  return (
    <div className="border-b-4 border-l-2 rounded-md border-neutral-80 shadow-lg laptop:p-20 flex tablet:flex-col gap-10 justify-center tablet:px-2 tablet:py-4 min-h-full">
      <DatePickerComponent
        setSelectedDateRange={setSelectedDateRange}
        selectedDateRange={selectedDateRange}
      />

      <TableComponent<ClientModel>
        polishedHeaderElements={polishedClientsReportsTableHeaderElements}
        routerPath={`/reports`}
        headerData="Clients reports"
        apolloQuery={GET_CLIENTS_REPORTS}
        columns={
          defaultClientReportsColumns as unknown as Array<
            ColumnDefBase<ClientModel, string>
          >
        }
        filters={defaultPromotionFilters}
      />
    </div>
  );
};
