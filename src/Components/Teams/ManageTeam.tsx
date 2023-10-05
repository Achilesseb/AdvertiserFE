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
import { TeamDrivers } from "./TeamDrivers";
import { TeamPromotions } from "./TeamPromotions";
import DefaultButtonComponent from "../DefaultButton";

export const ManageTeam = ({
  searchParams,
  isEditForm = false,
}: ManageTeamsProps) => {
  const router = useRouter();
  const [expandPromotionsData, setExpandPromotionsData] = useState(false);

  const handleCancelFormSubmit = useCallback(() => {
    router.replace("/teams");
  }, [router]);

  const formStylesModifiers = {
    formContainerStyles:
      "relative h-full flex flex-col gap-4 justify-start w-full mt-2 tablet:p-2",
    formInputsContainerStyles: "flex flex-col gap-4 mb-4 mt-4",
    formTitleStyles:
      "flex justify-between desktop:w-6/12 laptop:w-6/12 mt-8 tablet:p-2",
    formButtonContainerStyles: "mt-4  flex",
  };

  return (
    <div className="flex w-full tablet:p-0">
      <div className="flex w-full flex-wrap items-center justify-center  gap-10  tablet:flex-col tablet:p-0 laptop:p-4 desktop:p-4">
        <div className="desktop:w-4/12 laptop:w-4/12 tablet:w-full border-b-4 border-r-2 rounded-md border-neutral-80 py-10 shadow-lg">
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
        <div className="px-20 py-10 flex flex-col gap-4 desktop:w-7/12 laptop:w-7/12 border-b-4 border-l-2 rounded-md border-neutral-80 shadow-lg tablet:w-full tablet:p-2">
          <TeamDrivers searchParams={searchParams} />
        </div>
        <div className="flex flex-col w-full gap-4  mx-10 justify-center items-center tablet:p-0 tablet:m-0">
          {expandPromotionsData ? (
            <>
              <DefaultButtonComponent
                styleType="text"
                buttonText="Hide promotion data"
                modifier="w-5/12 tablet:w-full"
                onButtonClick={() => setExpandPromotionsData(false)}
              />

              <TeamPromotions searchParams={searchParams} />
            </>
          ) : (
            <div className="w-full flex justify-center">
              <DefaultButtonComponent
                styleType="filled"
                modifier="w-5/12  tablet:w-full"
                buttonText="Expand promotion data"
                onButtonClick={() => setExpandPromotionsData(true)}
              />
            </div>
          )}
        </div>
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
