"use client";
import {
  DELETE_DEVICE,
  GET_ALL_DEVICES,
} from "@/graphql/schemas/devicesSchema";
import { ColumnDefBase } from "@tanstack/react-table";
import { TableComponent } from "../Table/Table";
import {
  DeviceModel,
  generateDeviceTableHeaderElements,
} from "./devicesAnnexes/devicesPageTemplate";
import { useEffect, useState } from "react";
import { Snackbar } from "../SnackBar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import defaultDevicesColumns from "./devicesAnnexes/devicesPageTemplate";
import { useMutation } from "@apollo/client";

export const AllDevicesPage = ({
  searchParams,
}: {
  searchParams: Record<string, string | boolean>;
}) => {
  const [toDeleteDataIds, setToDeleteDataIds] = useState<Array<string>>([]);
  const [cityFilter, setCityFilter] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (searchParams?.action === "true") {
      router.replace("/devices");
      toast.custom(
        <Snackbar
          type="success"
          message={`Device ${
            searchParams?.type === "add" ? "added" : "updated"
          } succesfully`}
        />
      );
    }
  }, [searchParams, router]);
  const [deleteEntities] = useMutation(DELETE_DEVICE, {
    variables: {
      devicesIds: toDeleteDataIds,
    },
  });

  const deviceTableHeaderElements = generateDeviceTableHeaderElements(router);

  const polishedDeviceTableHeaderElements = {
    searchInput: {
      ...deviceTableHeaderElements.searchInput,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setCityFilter(event.target.value as string),
    },

    delete: {
      ...deviceTableHeaderElements.delete,
      onClick: deleteEntities,
    },
  };

  return (
    <div className="h-full px-20 py-4 border-b-4 border-l-2 rounded-md border-neutral-80 shadow-lg tablet:p-0">
      <TableComponent<DeviceModel>
        routerPath="/devices"
        headerData="Devices data"
        apolloQuery={GET_ALL_DEVICES}
        setToDeleteDataIds={setToDeleteDataIds}
        columns={
          defaultDevicesColumns as unknown as Array<
            ColumnDefBase<DeviceModel, string>
          >
        }
        polishedHeaderElements={polishedDeviceTableHeaderElements}
        {...(cityFilter && {
          filters: { location: cityFilter },
        })}
      />
    </div>
  );
};
