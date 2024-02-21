"use Client";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  defaultClientReportsColumns,
  defaultDriversReportsColumns,
  generateClientsReportsTableHeaderElements,
} from "./reportsAnnexes/reportsPage";

import { TableHeaderElement } from "../Table/TableHeader";
import {
  GET_CLIENTS_REPORTS,
  GET_DRIVERS_REPORTS,
} from "@/graphql/schemas/reportsSchema";
import { ColumnDefBase } from "@tanstack/react-table";
import { ClientModel } from "../Clients/clientsAnnexes/clientsPageTemplate";
import { TableComponent } from "../Table/Table";
import { DatePickerComponent } from "../DatePickerComponent";
import ClockLoader from "react-spinners/ClockLoader";

export const ReportsPage = ({ entity = "clients" }: { entity?: string }) => {
  const [currentEntity, setCurrentEntity] = useState<string | null>(null);
  const overallEntityCondition = entity === "clients";
  const [selectedDateRange, setSelectedDateRange] = useState<DateSelection>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [nameFilter, setNameFilter] = useState<string>("");
  const defaultPromotionFilters = {
    ...(nameFilter && {
      [overallEntityCondition ? "name" : "driverName"]: nameFilter,
    }),
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
    generateClientsReportsTableHeaderElements(entity);

  const polishedClientsReportsTableHeaderElements = {
    searchInput: {
      ...clientsTableHeaderElements.searchInput,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setNameFilter(event.target.value as string),
    },
  } as Record<string, TableHeaderElement>;

  useEffect(() => {
    if (entity !== currentEntity) {
      setCurrentEntity(null);
    }
    const timer = setTimeout(() => setCurrentEntity(entity), 1000);

    return () => clearTimeout(timer);
  }, [entity, currentEntity]);

  if (!currentEntity) return <ClockLoader />;

  return (
    <div className="border-b-4 border-l-2 rounded-md border-neutral-80 shadow-lg laptop:p-20 flex w-12/12 tablet:flex-col gap-10 justify-evenly tablet:px-2 tablet:py-4 min-h-full">
      <DatePickerComponent
        setSelectedDateRange={setSelectedDateRange}
        selectedDateRange={selectedDateRange}
      />
      <div className="w-12/12">
        <TableComponent<ClientModel>
          polishedHeaderElements={polishedClientsReportsTableHeaderElements}
          routerPath={`/reports/${entity}`}
          headerData={`${
            entity.charAt(0).toLocaleUpperCase() + entity.slice(1)
          } reports`}
          apolloQuery={
            overallEntityCondition ? GET_CLIENTS_REPORTS : GET_DRIVERS_REPORTS
          }
          columns={
            overallEntityCondition
              ? (defaultClientReportsColumns as unknown as Array<
                  ColumnDefBase<ClientModel, string>
                >)
              : (defaultDriversReportsColumns as unknown as Array<
                  ColumnDefBase<ClientModel, string>
                >)
          }
          filters={defaultPromotionFilters}
        />
      </div>
    </div>
  );
};

export type DateSelection = {
  startDate: Date;
  endDate: Date;
  key: string;
};
