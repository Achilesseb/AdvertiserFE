import { useState } from "react";

import Datepicker, {
  DateRangeType,
  DateValueType,
} from "react-tailwindcss-datepicker";
import {
  defaultClientReportsColumns,
  generateClientsReportsTableHeaderElements,
} from "./reportsAnnexes/reportsPage";

import { TableHeaderElement } from "../Table/TableHeader";
import { GET_CLIENTS_REPORTS } from "@/graphql/schemas/reportsSchema";
import { ColumnDefBase } from "@tanstack/react-table";
import { ClientModel } from "../Clients/clientsAnnexes/clientsPageTemplate";
import { TableComponent } from "../Table/Table";

export const AllClientsReportsPage = () => {
  const [value, setValue] = useState<DateRangeType>({
    startDate: new Date(),
    endDate: new Date().setMonth(11) as unknown as Date,
  });
  const handleValueChange = (newValue: DateValueType) =>
    setValue(newValue as DateRangeType);

  const [nameFilter, setNameFilter] = useState<string>("");
  const defaultPromotionFilters = {
    ...(nameFilter && { name: nameFilter }),
    ...(value.startDate && { startDate: value.startDate }),
    ...(value.endDate && { endDate: value.endDate }),
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
    <div className="">
      <Datepicker
        value={value}
        onChange={handleValueChange}
        displayFormat={"MM/DD/YYYY"}
        containerClassName="relative mt-4 border-2 border-primary-40 w-6/12 rounded-md mb-4"
        popoverDirection="down"
        showShortcuts
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
