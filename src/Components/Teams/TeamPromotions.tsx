import { GET_TEAMS_PROMOTIONS } from "@/graphql/schemas/teamsSchema";
import { ColumnDefBase, Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { TableComponent } from "../Table/Table";
import {
  TeamsPromotionsView,
  teamPromotionsColumns,
} from "./teamsAnnexes/manageTeamsTemplate";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { GetTeamPromosResultType } from "./ManageTeam";
import { usePaginationHook } from "@/customHooks/paginationHook";
import DefaultButtonComponent from "../DefaultButton";
import { SearchInputComponent } from "../SearchInputComponent";
import {
  ADD_NEW_PROMOTION_TO_TEAM,
  DELETE_PROMOTIONS_FROM_TEAMS,
  GET_ALL_PROMOTIONS,
} from "@/graphql/schemas/promotionSchema";
import ReactPlayer from "react-player";
import { getVideoUrlAws } from "@/aws/awsHelpers";
import DotLoader from "react-spinners/DotLoader";
import { generateTeamPromotionsTableHeaderElements } from "../Drivers/driversAnnexes/driversPageTemplate";

export const TeamPromotions = ({
  searchParams,
}: {
  searchParams?: { teamId?: string };
}) => {
  const [selectedPromoUrl, setPromoUrl] = useState<string>();
  const [resetSearchInput, setResetSearchInput] = useState(false);
  const router = useRouter();
  const pagination = usePaginationHook();
  const [selectedPromotionId, setSelectedPromotId] = useState<string | null>(
    null
  );
  const [toDeleteDataIds, setToDeleteDataIds] = useState<Array<string>>([]);
  const [externalData, setExternalData] = useState<TeamsPromotionsView[]>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>();
  const driverTableHeaderElements =
    generateTeamPromotionsTableHeaderElements(router);
  const [deleteDriversFromTeams] = useMutation(DELETE_PROMOTIONS_FROM_TEAMS, {
    variables: {
      promotionIds: toDeleteDataIds,
    },
  });

  const [addNewPromoToTeam] = useMutation(ADD_NEW_PROMOTION_TO_TEAM, {
    variables: {
      input: {
        promotionId: selectedPromotionId,
        teamId: searchParams?.teamId,
      },
    },
  });

  const { data, refetch } = useQuery<GetTeamPromosResultType>(
    GET_TEAMS_PROMOTIONS,
    {
      fetchPolicy: "network-only",
      variables: {
        input: {
          filters: {
            teamId: searchParams?.teamId,
          },
          pagination: {
            entitiesPerPage: pagination.resultsPerPage ?? 10,
            page: pagination.pageNumber ?? 1,
          },
        },
      },
    }
  );

  const polishedTeamPromotionsTableHeader = {
    delete: {
      ...driverTableHeaderElements.delete,
      onClick: async () => {
        const { data } = await deleteDriversFromTeams();
        const queryKey = Object.keys(data)[0];
        const deletedCount = data[queryKey]?.count;
        if (
          (totalCount - deletedCount) % pagination.resultsPerPage === 0 &&
          pagination.pageNumber > 1
        ) {
          pagination.setPageNumber(pagination.pageNumber - 1);
        }
      },
      refetch: () => refetch(),
    },
  };

  const handleOnClick = async () => {
    const result = await addNewPromoToTeam();

    if (result.data) {
      setSelectedPromotId(null);
      setResetSearchInput(true);
    }
    refetch();
  };

  useEffect(() => {
    if (!data) return;
    const queryKey = Object.keys(data)?.[0];
    const returnedQueryData =
      data?.[queryKey as keyof GetTeamPromosResultType]?.data;
    setExternalData(returnedQueryData);
    setTotalPages(
      Math.ceil(
        data?.[queryKey as keyof GetTeamPromosResultType]?.count /
          pagination.resultsPerPage
      )
    );
    setTotalCount(
      Math.ceil(data?.[queryKey as keyof GetTeamPromosResultType]?.count)
    );
    if (!selectedPromotionId) {
      setUrlToFrame(returnedQueryData?.[0]?.id, data);
    }
  }, [data, pagination.resultsPerPage]);

  const setUrlToFrame = async (
    rowId: string,
    innerFrameData: GetTeamPromosResultType
  ) => {
    if (!innerFrameData) return;
    const queryKey = Object.keys(innerFrameData)[0];
    const promoInnerFrameData =
      innerFrameData?.[queryKey as keyof GetTeamPromosResultType].data;
    const fileUrl = promoInnerFrameData?.filter((data) => data.id == rowId)[0]
      ?.fileName;

    if (!fileUrl) return "";

    const url = await getVideoUrlAws(fileUrl);
    setPromoUrl(url);
  };

  const customRowClickFunction = async (row: Row<TeamsPromotionsView>) => {
    if (!data) return;
    setUrlToFrame(row.original.id, data);
  };

  return (
    <div className="flex justify-evenly ">
      <div className="flex justify-center items-start h-full w-12/12 mt-10 desktop:full laptop:w-4/12">
        {selectedPromoUrl ? (
          <ReactPlayer
            controls
            {...(selectedPromoUrl && { url: selectedPromoUrl })}
          />
        ) : (
          <div>
            <DotLoader size={100} color="#286DA9" />
          </div>
        )}
      </div>
      <div>
        <div className="flex justify-between items-center">
          <div className="w-12/12">
            <SearchInputComponent
              setSelectedEntityId={setSelectedPromotId}
              queryExpression={GET_ALL_PROMOTIONS}
              displayKey="title"
              entityIdentifier="name"
              formFieldIdentifier="id"
              filterFieldIdentifier="title"
              reset={resetSearchInput}
              setReset={setResetSearchInput}
              {...{ placeholder: "Search promo title" }}
            />
          </div>
          <DefaultButtonComponent
            modifier="desktop:w-7/12 laptop:w-7/12"
            buttonText="Add to Team"
            buttonType="button"
            styleType="filled"
            onButtonClick={handleOnClick}
          />
        </div>
        <TableComponent<TeamsPromotionsView>
          externalPagination={pagination}
          externalCount={totalCount}
          externalTotalPages={totalPages}
          rowClickFunction={customRowClickFunction}
          tableHeader={false}
          externalData={externalData}
          apolloQuery={GET_TEAMS_PROMOTIONS}
          setToDeleteDataIds={setToDeleteDataIds}
          columns={
            teamPromotionsColumns as unknown as Array<
              ColumnDefBase<TeamsPromotionsView, string>
            >
          }
          polishedHeaderElements={polishedTeamPromotionsTableHeader}
          {...(searchParams?.teamId && {
            filters: { teamId: searchParams.teamId },
          })}
        />
      </div>
    </div>
  );
};
