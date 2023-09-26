"use client";
import * as React from "react";
import { DocumentNode } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table as BTable, RowProps } from "react-bootstrap";

import {
  ColumnDef,
  Table,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDefBase,
  Row,
} from "@tanstack/react-table";
import PaginationComponent from "../PaginationComponent";
import { usePaginationHook } from "@/customHooks/paginationHook";
import { useQuery } from "@apollo/client";
import {
  Dispatch,
  HTMLProps,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { TableHeader, TableHeaderElement } from "./TableHeader";
import { useRef } from "react";

const IndeterminateCheckbox = ({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
};

export const TableComponent = <DataType extends {}>({
  externalData,
  apolloQuery,
  columns,
  filters,
  routerPath,
  polishedHeaderElements,
  headerData,
  tableHeader = true,
  setToDeleteDataIds,
  rowsClickable = true,
  externalPagination,
  externalTotalPages,
  rowClickFunction,
  fetchPolicy,
}: {
  externalData?: DataType[];
  externalPagination?: {
    pageNumber: number;
    setPageNumber: (pageNumber: number) => void;
    resultsPerPage: number;
    setResultsPerPage: (resultsPerPage: number) => void;
  };
  externalCount?: number;
  apolloQuery: DocumentNode;
  columns: Array<ColumnDefBase<DataType, string>>;
  routerPath?: string;
  polishedHeaderElements: Record<string, TableHeaderElement>;
  filters?: Record<string, unknown>;
  headerData?: string;
  setToDeleteDataIds?: Dispatch<SetStateAction<Array<string>>>;
  tableHeader?: boolean;
  rowsClickable?: boolean;
  externalTotalPages?: number;
  rowClickFunction?: (row: Row<DataType>) => void;
  fetchPolicy?: string;
}) => {
  const [dataToRender, setDataToRender] = useState<Array<DataType>>([]);
  const [totalCount, setTotalCount] = useState<number | null>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const { resultsPerPage, pageNumber, setPageNumber } = usePaginationHook();
  const {
    pageNumber: pageNumberExternal,
    setPageNumber: setPageNumberExternal,
  } = externalPagination ?? {};
  const [selectedRows, setSelectedRows] = useState({});

  const router = useRouter();

  const { refetch } = useQuery(apolloQuery, {
    ...(fetchPolicy && { fetchPolicy: fetchPolicy }),
    skip: !!externalData,
    fetchPolicy: "cache-and-network",
    variables: {
      input: {
        pagination: {
          entitiesPerPage: resultsPerPage,
          page: pageNumber,
        },
        filters: {
          ...filters,
        },
      },
    },
    onCompleted: (data) => {
      const queryKey = Object.keys(data)[0];
      const stateData = data[queryKey];
      setDataToRender(stateData.data);
      setTotalCount(stateData.count);
      setTotalPages(Math.ceil(stateData.count / resultsPerPage));
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const finalColumns = [
    {
      id: "id",
      header: "Nr.",
      cell: ({ row }: { row: RowProps }) =>
        ((pageNumberExternal ?? pageNumber) - 1) * resultsPerPage +
        parseInt(row?.id ?? "0") +
        1,
      footer: ({ column }: { column: RowProps }) => column.id,
    },
    ...columns,
    {
      id: "select",
      header: ({ table }: { table: Table<DataType> }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }: { row: RowProps }) => (
        <div className="px-1" onClick={(e) => e.stopPropagation()}>
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!dataToRender) return;
    const selectedIDs = Object.keys(selectedRows).map(Number);
    const toDeleteData: Array<string> = (externalData ?? dataToRender)
      ?.filter((_data, index) => selectedIDs.includes(index))
      ?.map((data) => data?.["id" as keyof DataType] as string);

    setToDeleteDataIds?.([...toDeleteData]);
  }, [selectedRows, dataToRender, setToDeleteDataIds, externalData]);

  const table = useReactTable<DataType>({
    enableRowSelection: true,
    data: externalData ?? dataToRender,
    columns: finalColumns as unknown as Array<ColumnDef<DataType, string>>,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setSelectedRows,
    state: {
      rowSelection: selectedRows,
    },
  });

  const morePolishedHeaderElements = {
    ...(polishedHeaderElements?.searchInput && {
      searchInput: polishedHeaderElements.searchInput,
    }),
    ...(polishedHeaderElements?.addNew && {
      addNew: polishedHeaderElements?.addNew,
    }),
    delete: {
      ...polishedHeaderElements.delete,
      refetch: async () => {
        await refetch();
        setToDeleteDataIds?.([]);
        setSelectedRows({});
      },
    },
  };

  if (!table) return;
  return (
    <div className="p-2 flex flex-col gap-2">
      {tableHeader ? (
        <h3 className="text-2xl">{`${headerData} ${
          totalCount ? `(${totalCount})` : ""
        }`}</h3>
      ) : null}
      <TableHeader elements={morePolishedHeaderElements} />
      <BTable
        striped
        bordered
        hover
        responsive
        size="sm"
        className="font-[Inter-500] text-lg "
      >
        <thead className="p-2">
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className=" text-center items-center">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              {...(rowsClickable && {
                onClick: rowClickFunction
                  ? () => rowClickFunction(row)
                  : () =>
                      router.push(
                        `${routerPath}/${
                          (row.original as Record<string, unknown>).id
                        }`
                      ),
              })}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className=" text-center align-middle ">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </BTable>
      <div className="h-4" />
      <PaginationComponent
        totalPages={externalTotalPages ?? totalPages}
        currentPage={pageNumberExternal ?? pageNumber}
        changePage={setPageNumberExternal ?? setPageNumber}
      />
    </div>
  );
};
