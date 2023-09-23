"use client";
import { ColumnDefBase } from "@tanstack/react-table";
import { TableComponent } from "../Table/Table";

import React, { useEffect, useState } from "react";
import { Snackbar } from "../SnackBar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import driversDefaultColumns, {
  generateDriversTableHeaderElements,
} from "./driversAnnexes/driversPageTemplate";
import { DELETE_USER, GET_ALL_USERS } from "@/graphql/schemas/usersSchema";
import { DeviceModel } from "../Devices/devicesAnnexes/devicesPageTemplate";
import { useMutation } from "@apollo/client";

export const AllDriversPage = ({
  searchParams,
}: {
  searchParams: Record<string, string | boolean>;
}) => {
  const [toDeleteDataIds, setToDeleteDataIds] = useState<Array<string>>([]);
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

  const [deleteEntities] = useMutation(DELETE_USER, {
    variables: {
      usersIds: toDeleteDataIds,
    },
  });

  const driverTableHeaderElements = generateDriversTableHeaderElements(router);

  const polishedDriverTableHeaderElements = {
    searchInput: {
      ...driverTableHeaderElements.searchInput,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setCityFilter(event.target.value as string),
    },
    addNew: driverTableHeaderElements.addNew,
    delete: {
      ...driverTableHeaderElements.delete,
      onClick: deleteEntities,
    },
  };

  return (
    <div className="h-full px-20 py-4 flex flex-col gap-4">
      <TableComponent<UserModel>
        apolloQuery={GET_ALL_USERS}
        setToDeleteDataIds={setToDeleteDataIds}
        headerData="Drivers data"
        routerPath="/drivers"
        columns={
          driversDefaultColumns as unknown as Array<
            ColumnDefBase<UserModel, string>
          >
        }
        polishedHeaderElements={polishedDriverTableHeaderElements}
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
  car: string;
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
