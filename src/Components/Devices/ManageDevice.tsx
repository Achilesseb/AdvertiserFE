"use client";
import { DevicesValidationSchema } from "@/validationSchemas/devices";
import GenericForm from "../Form/Form";
import {
  ADD_NEW_DEVICE,
  EDIT_DEVICE,
  GET_DEVICE_BY_ID,
} from "@/graphql/schemas/devicesSchema";
import { deviceTemplate } from "./devicesAnnexes/manageDeviceTemplate";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import { DeviceModel } from "./devicesAnnexes/devicesPageTemplate";
import { FormikValues } from "formik";

export const ManageDevice = ({
  searchParams,
  isEditForm = false,
}: ManageDeviceProps) => {
  const [deviceId, setDeviceId] = useState<string>("");
  const [deviceData, setDeviceData] = useState<
    (DeviceModel & { driverId: string }) | null
  >(null);

  const router = useRouter();

  useQuery<Record<string, DeviceModel>>(GET_DEVICE_BY_ID, {
    skip: !isEditForm,
    variables: { deviceId: searchParams?.deviceId },
    onCompleted: (data) => {
      const queryKey = Object.keys(data)[0];
      const dataModel = data?.[queryKey];
      setDeviceData({
        ...dataModel,
        driverId: dataModel.driver.id,
      });
      setDeviceId(dataModel.id);
    },
  });

  const handleCancelFormSubmit = useCallback(() => {
    router.replace("/devices");
  }, [router]);

  const editFormSubmitHelper = (mutationValues: FormikValues) => ({
    ...mutationValues,
    id: deviceId,
  });

  if (isEditForm && !deviceData) return;

  return (
    <GenericForm<DeviceFormFields, DeviceModel>
      template={deviceTemplate}
      validationSchema={DevicesValidationSchema}
      mutationQuery={isEditForm ? EDIT_DEVICE : ADD_NEW_DEVICE}
      handleCancelFormSubmit={handleCancelFormSubmit}
      redirectRoute="/devices"
      isEditForm={isEditForm}
      mutationMappingFunc={editFormSubmitHelper}
      {...(deviceData && { externalData: deviceData })}
    />
  );
};

export type DeviceFormFields = {
  identificator: string;
  location: string;
  driverid: string;
  inUse: boolean;
  system: string;
};
type ManageDeviceProps = {
  searchParams?: { deviceId: string };
  isEditForm?: boolean;
};
