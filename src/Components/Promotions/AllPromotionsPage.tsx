"use client";

import {
  DELETE_PROMOTIONS,
  GET_ALL_PROMOTIONS,
} from "@/graphql/schemas/promotionSchema";
import { ColumnDefBase } from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { ClientModel } from "../Clients/clientsAnnexes/clientsPageTemplate";
import { TableComponent } from "../Table/Table";
import defaultPromotionsColumns, {
  generatePromotionsTableHeaderElements,
} from "./promotionsAnnexes/promotionsPageTemplate";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Snackbar } from "../SnackBar";
import { useMutation } from "@apollo/client";

export const AllPromotionsPage = (searchParams: PromotionPageSearchParams) => {
  const [toDeleteDataIds, setToDeleteDataIds] = useState<Array<string>>([]);
  const { clientId } = searchParams;
  const [titleFilter, setTitleFilter] = useState<string>("");
  const router = useRouter();

  const defaultPromotionFilters = {
    clientId,
    title: titleFilter,
  };

  const [deleteEntities] = useMutation(DELETE_PROMOTIONS, {
    variables: {
      promotionIds: toDeleteDataIds,
    },
  });
  useEffect(() => {
    if (searchParams?.action === "true") {
      router.replace("/devices");
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

  const clientsTableHeaderElements =
    generatePromotionsTableHeaderElements(router);

  const polishedPromotionsTableHeaderElements = {
    searchInput: {
      ...clientsTableHeaderElements.searchInput,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setTitleFilter(event.target.value as string),
    },
    addNew: {
      onClick: () => router.push(`/clients/${clientId}/newPromotion`),
      ...clientsTableHeaderElements.addNew,
    },
    delete: {
      ...clientsTableHeaderElements.delete,
      onClick: async () => await deleteEntities(),
    },
  };

  return (
    <TableComponent<ClientModel>
      setToDeleteDataIds={setToDeleteDataIds}
      polishedHeaderElements={polishedPromotionsTableHeaderElements}
      routerPath={`/clients/${clientId}`}
      headerData="Promotions"
      apolloQuery={GET_ALL_PROMOTIONS}
      columns={
        defaultPromotionsColumns as unknown as Array<
          ColumnDefBase<ClientModel, string>
        >
      }
      filters={defaultPromotionFilters}
    />
  );
};
export type PromotionPageSearchParams = {
  clientId?: string;
  promotionId?: string;
  action?: string;
  type?: string;
};
