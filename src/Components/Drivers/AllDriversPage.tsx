"use client";
import { ColumnDefBase } from "@tanstack/react-table";
import { TableComponent } from "../Table/Table";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Snackbar } from "../SnackBar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TableHeader } from "../Table/TableHeader";
import driversDefaultColumns, {
  generateDriversTableHeaderElements,
} from "./driversAnnexes/driversPageTemplate";
import { GET_ALL_USERS } from "@/graphql/schemas/usersSchema";
import { DeviceModel } from "../Devices/devicesAnnexes/devicesPageTemplate";

export const AllDriversPage = ({
  searchParams,
}: {
  searchParams: Record<string, string | boolean>;
}) => {
  const [cityFilter, setCityFilter] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (searchParams?.action === "true") {
      router.replace("/drivers");
      toast.custom(
        <Snackbar
          type="success"
          message={`Driver ${
            searchParams?.type === "add" ? "added" : "updated"
          } succesfully`}
        />
      );
    }
  }, [searchParams, router]);

  const deviceTableHeaderElements = generateDriversTableHeaderElements(router);

  const polishedDeviceTableHeaderElements = {
    searchInput: {
      ...deviceTableHeaderElements.searchInput,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setCityFilter(event.target.value as string),
    },
    addNew: deviceTableHeaderElements.addNew,
    delete: deviceTableHeaderElements.delete,
  };

  return (
    <div className="h-full px-20 py-4 flex flex-col gap-4">
      <h3 className="text-2xl">Devices data</h3>
      <TableHeader elements={polishedDeviceTableHeaderElements} />
      <TableComponent<UserModel>
        apolloQuery={GET_ALL_USERS}
        routerPath="/drivers"
        columns={
          driversDefaultColumns as unknown as Array<
            ColumnDefBase<UserModel, string>
          >
        }
        {...(cityFilter && {
          filters: { city: cityFilter },
        })}
      />
    </div>
  );
};

export type UserModel = {
  id: string;
  address: string;
  registrationPlate: string;
  city: string;
  name: string;
  phone: string;
  team: string;
  email: string;
  carDetails: string;
  tablets: number;
  role: string;
  createdAt: string;
  registrationCode: number;
  deviceId: string;
  teamId: string;
};

export type UserModelWithDevicesAndTeams = {
  id: string;
  address: string;
  registrationPlate: string;
  city: string;
  name: string;
  phone: string;
  team: string;
  email: string;
  createdAt: string;
  registrationCode: number;
  device: DeviceModel;
};
