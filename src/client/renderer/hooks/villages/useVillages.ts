import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';

import {
  GetVillages,
  UpdateVillages,
} from '*/graphql_operations/village.graphql';

import {
  GetVillagesQuery,
  UpdateVillagesSubscription,
} from '../../_types/graphql';

export const useVillages = (): GetVillagesQuery['villages'] | null => {
  const { data, loading, refetch } = useQuery<GetVillagesQuery>(GetVillages);

  useSubscription<UpdateVillagesSubscription>(UpdateVillages, {
    onSubscriptionData: () => refetch(),
  });

  return loading || !data
    ? null
    : data.villages;
};
