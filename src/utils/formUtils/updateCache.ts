import { DataWithIndex } from "@/Components/form/form";
import { ApolloCache, DocumentNode } from "@apollo/client";

export const updateFormCache = <T extends {}>({
  queryKey,
  cache,
  data,
  queryExpression,
  entityVariable,
  entityID,
}: {
  queryKey: string;
  cache: ApolloCache<T>;
  data: DataWithIndex;
  queryExpression: DocumentNode;
  entityVariable?: string;
  entityID?: string;
}) => {
  if (!entityID || !entityVariable || !queryKey) {
    return;
  }
  const mutationKey = Object.keys(data)[0];

  cache.writeQuery<T>({
    query: queryExpression,
    data: {
      [queryKey]: data?.[mutationKey],
    } as T,
    variables: { [entityVariable]: entityID },
  });
};
