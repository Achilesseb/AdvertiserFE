import { DataWithIndex } from "@/Components/Form/Form";
import { GET_DEVICE_BY_ID } from "@/graphql/schemas/devicesSchema";
import { FILLER_QUERY } from "@/graphql/schemas/fillerSchema";
import { ApolloCache } from "@apollo/client";
import { DocumentNode } from "graphql";

const getQueryInfo = (mutationKey: string) => {
  let queryKey: string;
  let queryExpression: DocumentNode;
  let queryVariable: string;

  switch (mutationKey) {
    case "editDevice":
      queryKey = "getDeviceById";
      queryExpression = GET_DEVICE_BY_ID;
      queryVariable = "deviceId";
      break;
    case "editClient":
      queryKey = "getClientById";
      queryExpression = GET_DEVICE_BY_ID;
      queryVariable = "clientId";
      break;
    case "editTeam":
      queryKey = "getTeamById";
      queryExpression = GET_DEVICE_BY_ID;
      queryVariable = "teamId";
      break;
    case "editUser":
      queryKey = "getUserById";
      queryExpression = GET_DEVICE_BY_ID;
      queryVariable = "userId";
      break;
    case "editPromotion":
      queryKey = "getPromotionById";
      queryExpression = GET_DEVICE_BY_ID;
      queryVariable = "promotionId";
      break;
    default:
      queryKey = "defaultAction";
      queryExpression = FILLER_QUERY;
      queryVariable = "";
      break;
  }

  return { queryKey, queryExpression, queryVariable };
};

export const updateFormCache = <DataType extends {}>(
  { data }: { data: DataWithIndex<DataType> },
  cache: ApolloCache<DataType>,
  externalData: DataType & { id: string }
) => {
  const { id } = externalData ?? {};

  if (!id || !data) {
    return;
  }

  const mutationKey = Object.keys(data)[0];
  let queryKey: string;
  let queryExpression: DocumentNode;
  let queryVariable: string;

  switch (mutationKey) {
    case "editDevice":
      queryKey = "getDeviceById";
      queryExpression = GET_DEVICE_BY_ID;
      queryVariable = "deviceId";
      break;

    default:
      queryKey = "defaultAction";
      queryExpression = GET_DEVICE_BY_ID;
      queryVariable = "deviceId";
      break;
  }

  cache.writeQuery<DataType>({
    query: queryExpression,
    data: {
      [queryKey]: data?.[mutationKey],
    } as DataType,
    variables: { [queryVariable]: id },
  });
};
