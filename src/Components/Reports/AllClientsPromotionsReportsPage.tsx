"use Client";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";

import {
  defaultClientPromotionsReportsColumns,
  generateClientsPromotionsReportsTableHeaderElements,
} from "./reportsAnnexes/reportsPage";

import { TableHeaderElement } from "../Table/TableHeader";
import { GET_CLIENTS_PROMOTIONS_REPORTS } from "@/graphql/schemas/reportsSchema";
import { ColumnDefBase } from "@tanstack/react-table";
import { ClientModel } from "../Clients/clientsAnnexes/clientsPageTemplate";
import { TableComponent } from "../Table/Table";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { DateSelection } from "./AllClientsReportsPage";

export const AllClientsPromotionsReportsPage = ({
  clientId,
}: {
  clientId: string;
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateSelection>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [showDatePicker, setShowDatePicker] = useState(true);

  const handleSelect = (ranges: RangeKeyDict) => {
    setSelectedDateRange(ranges.selection as unknown as DateSelection);
  };
  const onClickClear = () => {
    setSelectedDateRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
  };

  const [nameFilter, setNameFilter] = useState<string>("");
  const defaultPromotionFilters = {
    ...(clientId && { clientId }),
    ...(nameFilter && { title: nameFilter }),
    ...(selectedDateRange?.startDate && {
      startDate: selectedDateRange.startDate,
    }),
    ...(selectedDateRange?.endDate && { endDate: selectedDateRange.endDate }),
  };

  const clientsTableHeaderElements =
    generateClientsPromotionsReportsTableHeaderElements;

  const polishedClientsReportsTableHeaderElements = {
    searchInput: {
      ...clientsTableHeaderElements.searchInput,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setNameFilter(event.target.value as string),
    },
  } as Record<string, TableHeaderElement>;

  return (
    <div className="">
      {showDatePicker ? (
        <>
          <DateRangePicker
            ranges={[selectedDateRange]}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            direction="horizontal"
            months={2}
          />
          <button
            className=" text-success-50 px-4 border-2 ml-2 mt-2 border-neutral-40 p-2 rounded-xl"
            onClick={onClickClear}
          >
            Clear
          </button>
        </>
      ) : null}

      <button
        className="text-danger px-4 border-2 border-neutral-40 p-2 rounded-xl ml-2"
        onClick={() => setShowDatePicker(!showDatePicker)}
      >
        {showDatePicker ? "Hide" : "Pick dates"}
      </button>

      <TableComponent<ClientModel>
        polishedHeaderElements={polishedClientsReportsTableHeaderElements}
        rowsClickable={false}
        headerData="Client promotions reports"
        apolloQuery={GET_CLIENTS_PROMOTIONS_REPORTS}
        columns={
          defaultClientPromotionsReportsColumns as unknown as Array<
            ColumnDefBase<ClientModel, string>
          >
        }
        filters={defaultPromotionFilters}
      />
    </div>
  );
};
