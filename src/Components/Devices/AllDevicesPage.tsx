"use client";
import { GET_ALL_DEVICES } from "@/graphql/schemas/devicesSchema";
import { ColumnDefBase } from "@tanstack/react-table";
import { TableComponent } from "../Table";
import defaultColumns, { DeviceModel } from "./devicesPageTemplate";

export const AllDevicesPage = () => (
  <div className="h-full ag-theme-alpine px-20 py-4">
    <h3 className="text-2xl mb-5">
      Tablets data
      <p className="text-gray-400 text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
        laborum.
      </p>
    </h3>
    <TableComponent<DeviceModel>
      apolloQuery={GET_ALL_DEVICES}
      columns={
        defaultColumns as unknown as Array<ColumnDefBase<DeviceModel, string>>
      }
    />
  </div>
);
