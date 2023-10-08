"use client";
import { ColumnDefBase } from "@tanstack/react-table";
import { TableComponent } from "../Table/Table";

import { useEffect, useState } from "react";
import { Snackbar } from "../SnackBar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import defaultClientsColumns, {
  ClientModel,
  generateClientsTableHeaderElements,
} from "./clientsAnnexes/clientsPageTemplate";
import {
  DELETE_CLIENT,
  GET_ALL_CLIENTS,
} from "@/graphql/schemas/clientsSchema";
import { useMutation } from "@apollo/client";

export const AllClientsPage = ({
  searchParams,
}: {
  searchParams: Record<string, string | boolean>;
}) => {
  const [toDeleteDataIds, setToDeleteDataIds] = useState<Array<string>>([]);
  const [cityFilter, setCityFilter] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (searchParams?.action === "true") {
      router.replace("/clients");
      toast.custom(
        <Snackbar
          type="success"
          message={`Client ${
            searchParams?.type === "add" ? "added" : "updated"
          } succesfully`}
        />
      );
    }
  }, [searchParams, router]);

  const clientsTableHeaderElements = generateClientsTableHeaderElements(router);
  const [deleteEntities] = useMutation(DELETE_CLIENT, {
    variables: {
      clientIds: toDeleteDataIds,
    },
  });
  const polishedClientsTableHeaderElements = {
    searchInput: {
      ...clientsTableHeaderElements.searchInput,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setCityFilter(event.target.value as string),
    },
    addNew: clientsTableHeaderElements.addNew,
    delete: {
      ...clientsTableHeaderElements.delete,
      onClick: deleteEntities,
    },
  };

  return (
    <div className=" px-20 py-4 flex flex-col h-full gap-4 border-b-4 border-l-2 rounded-md border-neutral-80 shadow-lg p-20  tablet:px-0 tablet:p-0 ">
      <TableComponent<ClientModel>
        setToDeleteDataIds={setToDeleteDataIds}
        polishedHeaderElements={polishedClientsTableHeaderElements}
        routerPath="/clients"
        headerData="Clients page"
        apolloQuery={GET_ALL_CLIENTS}
        columns={
          defaultClientsColumns as unknown as Array<
            ColumnDefBase<ClientModel, string>
          >
        }
        {...(cityFilter && {
          filters: { city: cityFilter },
        })}
      />
    </div>
  );
};
