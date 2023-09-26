import {
  DELETE_USERS_FROM_TEAMS,
  GET_ALL_UNTEAMED_USERS,
  GET_TEAM_DRIVERS,
} from "@/graphql/schemas/teamsSchema";
import { ColumnDefBase } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { UserModel } from "../Drivers/AllDriversPage";
import { TableComponent } from "../Table/Table";
import { teamDriversColumns } from "./teamsAnnexes/manageTeamsTemplate";
import { generateDriversTableHeaderElements } from "../Drivers/driversAnnexes/driversPageTemplate";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { GetTeamDriversResultType } from "./ManageTeam";
import { usePaginationHook } from "@/customHooks/paginationHook";
import DefaultButtonComponent from "../DefaultButton";
import { SearchInputComponent } from "../SearchInputComponent";
import { EDIT_USER } from "@/graphql/schemas/usersSchema";

export const TeamDrivers = ({
  searchParams,
}: {
  searchParams?: { teamId?: string };
}) => {
  const [resetSearchInput, setResetSearchInput] = useState(false);
  const router = useRouter();
  const pagination = usePaginationHook();
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [toDeleteDataIds, setToDeleteDataIds] = useState<Array<string>>([]);
  const [externalData, setExternalData] = useState<UserModel[]>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>();
  const driverTableHeaderElements = generateDriversTableHeaderElements(router);
  const [deleteDriversFromTeams] = useMutation(DELETE_USERS_FROM_TEAMS, {
    variables: {
      usersIds: toDeleteDataIds,
    },
  });
  const [editDriverTeam] = useMutation(EDIT_USER, {
    variables: {
      input: {
        userId: selectedDriverId,
        teamId: searchParams?.teamId,
      },
    },
  });
  const { data, refetch } = useQuery<GetTeamDriversResultType>(
    GET_TEAM_DRIVERS,
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

  const polishedDriverTableHeaderElements = {
    addNew: {
      ...driverTableHeaderElements.addNew,
      onClick: () => router.push("/drivers/newDriver"),
    },
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
    const result = await editDriverTeam();

    if (result.data) {
      setSelectedDriverId(null);
      setResetSearchInput(true);
    }
    refetch();
  };

  useEffect(() => {
    if (!data) return;
    const queryKey = Object.keys(data)?.[0];
    setExternalData(data?.[queryKey as keyof GetTeamDriversResultType]?.data);
    setTotalPages(
      Math.ceil(
        data?.[queryKey as keyof GetTeamDriversResultType]?.count /
          pagination.resultsPerPage
      )
    );
    setTotalCount(
      Math.ceil(data?.[queryKey as keyof GetTeamDriversResultType]?.count)
    );
  }, [data, pagination.resultsPerPage]);
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="w-12/12">
          <SearchInputComponent
            setSelectedEntityId={setSelectedDriverId}
            queryExpression={GET_ALL_UNTEAMED_USERS}
            displayKey="name"
            entityIdentifier="name"
            formFieldIdentifier="id"
            filterFieldIdentifier="name"
            reset={resetSearchInput}
            setReset={setResetSearchInput}
            {...{ placeholder: "Search driver name" }}
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
      <TableComponent<UserModel>
        externalPagination={pagination}
        externalCount={totalCount}
        externalTotalPages={totalPages}
        rowsClickable={false}
        tableHeader={false}
        externalData={externalData}
        apolloQuery={GET_TEAM_DRIVERS}
        setToDeleteDataIds={setToDeleteDataIds}
        columns={
          teamDriversColumns as unknown as Array<
            ColumnDefBase<UserModel, string>
          >
        }
        polishedHeaderElements={polishedDriverTableHeaderElements}
        {...(searchParams?.teamId && {
          filters: { teamId: searchParams.teamId },
        })}
      />
    </>
  );
};
