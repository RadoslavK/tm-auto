import { useGetSelectedVillageIdQuery } from '../../_graphql/graphqlHooks';

export const useSelectedVillageId = () =>
  useGetSelectedVillageIdQuery().data?.selectedVillageId || '';
