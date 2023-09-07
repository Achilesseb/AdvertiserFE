"use client";
import { GET_ALL_DEVICES } from "@/graphql/schemas/devicesSchema";
import { ColumnDefBase } from "@tanstack/react-table";
import { TableComponent } from "../Table/Table";
import defaultColumns, {
  DeviceModel,
  generateDeviceTableHeaderElements,
} from "./devicesAnnexes/devicesPageTemplate";
import { useEffect } from "react";
import { Snackbar } from "../SnackBar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TableHeader, TableHeaderElement } from "../Table/TableHeader";

export const AllDevicesPage = ({
  searchParams,
}: {
  searchParams: Record<string, string | boolean>;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (searchParams?.action === "true") {
      router.replace("/devices");
      toast.custom(
        <Snackbar type="success" message="Device added succesfully" />
      );
    }
  }, [searchParams, router]);

  const deviceTableHeaderElements = generateDeviceTableHeaderElements(router);

  return (
    <div className="h-full px-20 py-4 flex flex-col gap-4">
      <h3 className="text-2xl">Devices data</h3>
      <TableHeader elements={deviceTableHeaderElements} />
      <TableComponent<DeviceModel>
        apolloQuery={GET_ALL_DEVICES}
        columns={
          defaultColumns as unknown as Array<ColumnDefBase<DeviceModel, string>>
        }
      />
    </div>
  );
};
