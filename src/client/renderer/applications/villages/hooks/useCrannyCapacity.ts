import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';

import {
  CrannyCapacity,
  CrannyCapacityChanged,
} from '*/graphql_operations/village.graphql';

import {
  CrannyCapacityChangedSubscription,
  CrannyCapacityChangedSubscriptionVariables,
  CrannyCapacityQuery,
  CrannyCapacityQueryVariables,
  VillageCrannyCapacity,
} from '../../../_types/graphql';
import { useVillageContext } from '../context/villageContext';

export const useCrannyCapacity = (): VillageCrannyCapacity | null => {
  const { villageId } = useVillageContext();

  const crannyCapacityResult = useQuery<CrannyCapacityQuery, CrannyCapacityQueryVariables>(
    CrannyCapacity,
    { variables: { villageId } },
  );

  useSubscription<CrannyCapacityChangedSubscription, CrannyCapacityChangedSubscriptionVariables>(
    CrannyCapacityChanged,
    {
      onSubscriptionData: () => {
        crannyCapacityResult.refetch();
      },
      variables: { villageId },
    },
  );

  return !crannyCapacityResult.loading && crannyCapacityResult.data
    ? crannyCapacityResult.data.crannyCapacity
    : null;
};