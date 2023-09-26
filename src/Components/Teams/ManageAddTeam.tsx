"use client";
import { TeamsValidationSchema } from "@/validationSchemas/devices";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Form from "../form/FormMain";
import {
  TeamsPromotionsView,
  teamsFormTemplate,
} from "./teamsAnnexes/manageTeamsTemplate";
import {
  ADD_NEW_TEAM,
  EDIT_TEAM,
  GET_TEAM_BY_ID,
} from "@/graphql/schemas/teamsSchema";
import { UserModel } from "../Drivers/AllDriversPage";

export const ManageAddTeam = ({
  searchParams,
  isEditForm = false,
}: ManageTeamsProps) => {
  const router = useRouter();

  const handleCancelFormSubmit = useCallback(() => {
    router.replace("/teams");
  }, [router]);

  const formStylesModifiers = {
    formContainerStyles:
      "relative h-full flex flex-col gap-4 justify-start w-full mt-2",
    formInputsContainerStyles: "flex flex-col gap-4 mb-4 mt-28",
    formTitleStyles: "flex justify-between desktop:w-6/12 laptop:w-6/12 mt-8 ",
    formButtonContainerStyles: "mb-4  bottom-0 mt-12  flex",
  };

  return (
    <div className="flex w-full flex-wrap min-h-[700px]">
      <div className="desktop:w-4/12 laptop:w-4/12">
        <Form
          headlessForm={false}
          queryExpression={GET_TEAM_BY_ID}
          mutationExpression={isEditForm ? EDIT_TEAM : ADD_NEW_TEAM}
          validationSchema={TeamsValidationSchema}
          formTemplate={teamsFormTemplate}
          handleCancelButton={handleCancelFormSubmit}
          skipQuery={!isEditForm}
          formTitle="Informatii despre echipa"
          formStylesModifier={formStylesModifiers}
          redirectRoute="/teams"
          {...(isEditForm && {
            entityID: searchParams?.teamId,
            entityVariable: "id",
          })}
        />
      </div>
    </div>
  );
};

export type ManageTeamsProps = {
  searchParams?: { teamId?: string };
  isEditForm?: boolean;
};
export type GetTeamDriversResultType = {
  getTeamDrivers: { data: UserModel[]; count: number };
};

export type GetTeamPromosResultType = {
  getPromotionsByTeam: { data: TeamsPromotionsView[]; count: number };
};
