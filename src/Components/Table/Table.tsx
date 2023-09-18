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
} from "@tanstack/react-table";
import PaginationComponent from "../PaginationComponent";
import { usePaginationHook } from "@/customHooks/paginationHook";
import { useQuery } from "@apollo/client";
import { HTMLProps, useState } from "react";
import { useRouter } from "next/navigation";

const IndeterminateCheckbox = ({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
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
  apolloQuery,
  columns,
  filters,
  routerPath,
}: {
  apolloQuery: DocumentNode;
  columns: Array<ColumnDefBase<DataType, string>>;
  filters?: Record<string, unknown>;
  routerPath: string;
}) => {
  const [dataToRender, setDataToRender] = useState<Array<DataType>>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { resultsPerPage, pageNumber, setPageNumber } = usePaginationHook();

  const router = useRouter();

  useQuery(apolloQuery, {
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
      setTotalPages(Math.ceil(stateData.count / resultsPerPage));
    },
  });

  const finalColumns = [
    {
      id: "id",
      header: "Nr.",
      cell: ({ row }: { row: RowProps }) =>
        (pageNumber - 1) * resultsPerPage + parseInt(row?.id ?? "0") + 1,
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

  const table = useReactTable<DataType>({
    data: dataToRender,
    columns: finalColumns as unknown as Array<ColumnDef<DataType, string>>,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!table) return;

  return (
    <div className="p-2">
      <BTable
        striped
        bordered
        hover
        responsive
        size="sm"
        className="font-[Inter-500] text-lg "
      >
        <thead className="p-4">
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className=" text-center">
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
              onClick={() =>
                router.push(
                  `${routerPath}/${
                    (row.original as Record<string, unknown>).id
                  }`
                )
              }
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className=" text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </BTable>
      <div className="h-4" />
      <PaginationComponent
        totalPages={totalPages}
        currentPage={pageNumber}
        changePage={setPageNumber}
      />
    </div>
  );
};
