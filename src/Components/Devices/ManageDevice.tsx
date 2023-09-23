"use client";
import { DevicesValidationSchema } from "@/validationSchemas/devices";
import {
  ADD_NEW_DEVICE,
  EDIT_DEVICE,
  GET_DEVICE_BY_ID,
} from "@/graphql/schemas/devicesSchema";
import {
  DevicesFormData,
  deviceNewFormTemplate,
} from "./devicesAnnexes/manageDeviceTemplate";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Form from "../form/FormMain";
import { GET_ALL_AVAILABLE_DRIVERS } from "@/graphql/schemas/usersSchema";
import { FormTemplateDefinition } from "../form/formTemplate";
import { SearchInputComponent } from "../SearchInputComponent";

export const ManageDevice = ({
  searchParams,
  isEditForm = false,
}: ManageDeviceProps) => {
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const defaultMutationVariables = {
    ...(selectedDriverId && { driverId: selectedDriverId }),
  };

  const router = useRouter();

  const handleCancelFormSubmit = useCallback(() => {
    router.replace("/devices");
  }, [router]);

  const formStylesModifiers = {
    formContainerStyles:
      "relative h-full flex flex-col gap-4 justify-start desktop:w-6/12 laptop:w-8/12",
    formInputsContainerStyles: "flex flex-col gap-4 mb-4 mt-4",
    formTitleStyles:
      "flex justify-between desktop:w-6/12 laptop:w-8/12 mb-2 mt-2 ",
    formButtonContainerStyles: "mb-4  bottom-0 w-full flex",
  };

  const devicesTemplate: FormTemplateDefinition<DevicesFormData> = {
    name: {
      ...deviceNewFormTemplate.driver,
      disabled: isEditForm,
      ...(!isEditForm && {
        type: "react-element",
        element: (formTrigger, errors, props) => (
          <SearchInputComponent
            setSelectedEntityId={setSelectedDriverId}
            queryExpression={GET_ALL_AVAILABLE_DRIVERS}
            formTrigger={formTrigger}
            formTemplate={deviceNewFormTemplate}
            errors={errors}
            entityIdentifier="name"
            formFieldIdentifier="driverId"
            filterFieldIdentifier="name"
            {...props}
          />
        ),
      }),
    },
    identifier: {
      disabled: isEditForm,
      ...deviceNewFormTemplate.identifier,
    },
    system: { disabled: isEditForm, ...deviceNewFormTemplate.system },
    location: deviceNewFormTemplate.location,
    inUse: deviceNewFormTemplate.inUse,
  };

  return (
    <Form
      headlessForm={false}
      queryExpression={GET_DEVICE_BY_ID}
      mutationExpression={isEditForm ? EDIT_DEVICE : ADD_NEW_DEVICE}
      validationSchema={DevicesValidationSchema}
      formTemplate={devicesTemplate}
      handleCancelButton={handleCancelFormSubmit}
      skipQuery={!isEditForm}
      formTitle="Informatii despre dispozitiv"
      formStylesModifier={formStylesModifiers}
      redirectRoute="/devices"
      defaultMutationVariables={defaultMutationVariables}
      {...(isEditForm && {
        entityID: searchParams?.deviceId,
        entityVariable: "deviceId",
      })}
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
