import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';

import {
  GetVillages,
  UpdateVillages,
} from "*/graphql_operations/village.graphql";

import {
  IGetVillagesQuery,
  IUpdateVillagesSubscription,
} from '../../../_types/graphql';

export const useVillages = () => {
  const { data, loading, refetch } = useQuery<IGetVillagesQuery>(GetVillages);

  useSubscription<IUpdateVillagesSubscription>(UpdateVillages, {
    onSubscriptionData: () => {
      refetch();
    },
  });

  if (loading || !data) {
    return null;
  }

  return data.villages;
};