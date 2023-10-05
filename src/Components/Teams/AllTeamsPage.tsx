"use client";

import { ColumnDefBase } from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { TableComponent } from "../Table/Table";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Snackbar } from "../SnackBar";
import { useMutation } from "@apollo/client";
import { DELETE_TEAMS, GET_ALL_TEAMS } from "@/graphql/schemas/teamsSchema";
import defaultTeamsColumn, {
  TeamsModel,
  generateTeamsTableHeaderElements,
} from "./teamsAnnexes/teamsPageTemplate";

export const AllTeamsPage = ({
  searchParams,
}: {
  searchParams: TeamPageSearchParams;
}) => {
  const [toDeleteDataIds, setToDeleteDataIds] = useState<Array<string>>([]);
  const [titleFilter, setTitleFilter] = useState<string>("");
  const router = useRouter();

  const defaultPromotionFilters = {
    teamName: titleFilter,
  };
  const [deleteEntities] = useMutation(DELETE_TEAMS, {
    variables: {
      teamIds: toDeleteDataIds,
    },
  });
  useEffect(() => {
    if (searchParams?.action === "true") {
      router.replace("/teams");
      toast.custom(
        <Snackbar
          type="success"
          message={`Team ${
            searchParams?.type === "add" ? "added" : "updated"
          } succesfully`}
        />
      );
    }
  }, [searchParams, router]);

  const clientsTableHeaderElements = generateTeamsTableHeaderElements(router);

  const polishedPromotionsTableHeaderElements = {
    searchInput: {
      ...clientsTableHeaderElements.searchInput,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setTitleFilter(event.target.value as string),
    },
    addNew: clientsTableHeaderElements.addNew,
    delete: {
      ...clientsTableHeaderElements.delete,
      onClick: async () => await deleteEntities(),
    },
  };

  return (
    <div className="border-b-4 border-l-2 rounded-md border-neutral-80 shadow-lg p-20 tablet:p-0">
      <TableComponent<TeamsModel>
        setToDeleteDataIds={setToDeleteDataIds}
        polishedHeaderElements={polishedPromotionsTableHeaderElements}
        routerPath={"/teams"}
        headerData="Teams"
        apolloQuery={GET_ALL_TEAMS}
        columns={
          defaultTeamsColumn as unknown as Array<
            ColumnDefBase<TeamsModel, string>
          >
        }
        filters={defaultPromotionFilters}
      />
    </div>
  );
};
export type TeamPageSearchParams = {
  teamId?: string;
  action?: string;
  type?: string;
};
