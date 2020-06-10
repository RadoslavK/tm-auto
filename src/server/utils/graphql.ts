import {
  ApolloCache,
  DocumentNode,
} from '@apollo/client';

type Base<TQueryVariables> = keyof TQueryVariables extends never
  ? {
    readonly cache: ApolloCache<unknown>;
    readonly query: DocumentNode;
    readonly variables?: TQueryVariables;
  }
  : {
    readonly cache: ApolloCache<unknown>;
    readonly query: DocumentNode;
    readonly variables: TQueryVariables;
  };

type UpdateQueryCacheParamsWithMerge<TQueryData, TQueryVariables> = Base<TQueryVariables> & {
  readonly mergeWithOriginal: (original: TQueryData) => TQueryData;
};

type UpdateQueryCacheParamsWithData<TQueryData, TQueryVariables> = Base<TQueryVariables> & {
  readonly data: TQueryData;
};

type UpdateQueryCache<TQueryData, TQueryVariables> = UpdateQueryCacheParamsWithMerge<TQueryData, TQueryVariables> | UpdateQueryCacheParamsWithData<TQueryData, TQueryVariables>;

const isWithMerge = <TQueryData, TQueryVariables>(update: UpdateQueryCache<TQueryData, TQueryVariables>): update is UpdateQueryCacheParamsWithMerge<TQueryData, TQueryVariables> =>
  (update as UpdateQueryCacheParamsWithMerge<TQueryData, TQueryVariables>).mergeWithOriginal !== undefined;

export const updateQueryCache = <TQueryData, TQueryVariables>(update: UpdateQueryCache<TQueryData, TQueryVariables>) => {
  const { cache, query, variables } = update;

  const writeData = (data: TQueryData) => {
    cache.writeQuery<TQueryData, TQueryVariables>({
      query,
      variables,
      data,
    });
  };

  if (!isWithMerge(update)) {
    writeData(update.data);

    return;
  }

  const result = cache.readQuery<TQueryData, TQueryVariables>({
    query,
    variables,
  });

  if (!result) {
    return;
  }

  const updatedResult = update.mergeWithOriginal(result);

  writeData(updatedResult);
};