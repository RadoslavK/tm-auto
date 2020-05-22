import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';

import {
  CrannyCapacity as CrannyCapacityQuery,
  CrannyCapacityChanged,
} from '*/graphql_operations/village.graphql';

import {
  ICrannyCapacityChangedSubscription,
  ICrannyCapacityChangedSubscriptionVariables,
  ICrannyCapacityQuery,
  ICrannyCapacityQueryVariables,
  IVillageCrannyCapacity,
} from '../../../../_types/graphql';
import { useVillageContext } from '../../../hooks/useVillageContext';

export const useCrannyCapacity = (): IVillageCrannyCapacity | null => {
  const { villageId } = useVillageContext();

  const crannyCapacityResult = useQuery<ICrannyCapacityQuery, ICrannyCapacityQueryVariables>(
    CrannyCapacityQuery,
    { variables: { villageId } },
  );

  useSubscription<ICrannyCapacityChangedSubscription, ICrannyCapacityChangedSubscriptionVariables>(
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