import {
  ADD_NEW_USER,
  EDIT_USER,
  GET_USER_BY_ID,
} from "@/graphql/schemas/usersSchema";
import { DriversValidationSchema } from "@/validationSchemas/devices";
import { useQuery } from "@apollo/client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { UserModelWithDevicesAndTeams } from "./AllDriversPage";
import {
  UsersFormData,
  driversNewFormTemplate,
} from "./driversAnnexes/manageDriverTemplate";
import Form from "../form/FormMain";
import { FormTemplateDefinition } from "../form/formTemplate";
import { SearchInputComponent } from "../SearchInputComponent";
import { GET_ALL_TEAMS } from "@/graphql/schemas/teamsSchema";
import { GET_ALL_AVAILABLE_DEVICES } from "@/graphql/schemas/devicesSchema";
import { DeviceModel } from "../Devices/devicesAnnexes/devicesPageTemplate";

export const ManageDriver = ({
  searchParams,
  isEditForm = false,
}: ManageDriverProps) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserModelWithDevicesAndTeams>();

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  useQuery(GET_USER_BY_ID, {
    skip: !isEditForm,
    variables: {
      userId: searchParams?.driverId,
    },
    onCompleted: (data) => {
      const queryKey = Object.keys(data)[0];
      setUserData(data[queryKey]);
    },
  });
  const defaultMutationVariables = {
    ...(selectedTeamId && { teamId: selectedTeamId }),
    ...(selectedDeviceId && { deviceId: selectedDeviceId }),
  };

  const driversTemplate: FormTemplateDefinition<UsersFormData> = {
    team: {
      fieldName: "team",
      label: "Team (type to search)",
      type: "react-element",
      excludeFromMutation: true,
      element: (formTrigger, errors, props) => (
        <SearchInputComponent
          setSelectedEntityId={setSelectedTeamId}
          externalData={userData?.team}
          queryExpression={GET_ALL_TEAMS}
          formTrigger={formTrigger}
          formTemplate={driversNewFormTemplate}
          errors={errors}
          placeholder="Search after team name"
          entityIdentifier="name"
          formFieldIdentifier="teamId"
          filterFieldIdentifier="teamName"
          displayKey="teamName"
          {...props}
        />
      ),
    },
    device: {
      fieldName: "identifier",
      label: "Device (type to search)",
      type: "react-element",
      excludeFromMutation: true,
      disabled: true,
      element: (formTrigger, errors, props) => (
        <SearchInputComponent<DeviceModel, UsersFormData>
          displayKey="identifier"
          queryExpression={GET_ALL_AVAILABLE_DEVICES}
          externalData={userData?.device}
          entityIdentifier="identifier"
          formFieldIdentifier="deviceId"
          filterFieldIdentifier="identifier"
          setSelectedEntityId={setSelectedDeviceId}
          formTrigger={formTrigger}
          errors={errors}
          placeholder="Search after device name"
          formTemplate={driversNewFormTemplate}
          {...props}
        />
      ),
    },
    ...driversNewFormTemplate,
  };

  const handleCancelFormSubmit = useCallback(() => {
    router.replace("/drivers");
  }, [router]);

  const formStylesModifiers = {
    formContainerStyles:
      "h-auto flex flex-col items-center gap-4 w-full justify-center w-10/12 border-b-4 border-l-2 rounded-md border-neutral-80 shadow-lg p-20 tablet:p-4",
    formInputsContainerStyles:
      "grid grid-cols-2 w-full gap-x-20 gap-y-4 tablet:flex tablet:flex-col",
    formTitleStyles:
      "flex justify-between desktop:w-6/12 laptop:w-8/12 mb-6 mt-2 text-xl",
    formButtonContainerStyles: "mb-4 mt-10 flex w-6/12 ",
  };

  return (
    <Form
      headlessForm={false}
      queryExpression={GET_USER_BY_ID}
      mutationExpression={isEditForm ? EDIT_USER : ADD_NEW_USER}
      validationSchema={DriversValidationSchema}
      formTemplate={driversTemplate}
      handleCancelButton={handleCancelFormSubmit}
      skipQuery={!isEditForm}
      formTitle="Informatii despre sofer"
      formStylesModifier={formStylesModifiers}
      redirectRoute="/drivers"
      defaultMutationVariables={defaultMutationVariables}
      {...(isEditForm && {
        entityID: searchParams?.driverId,
        entityVariable: "userId",
      })}
    />
  );
};

type ManageDriverProps = {
  searchParams?: { driverId: string };
  isEditForm?: boolean;
};
