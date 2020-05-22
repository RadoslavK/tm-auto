import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import {
  useEffect,
  useState,
} from 'react';

import {
  ActiveVillageId,
  ActiveVillageIdChanged,
} from '*/graphql_operations/village.graphql';

import {
  IActiveVillageIdChangedSubscription,
  IActiveVillageIdQuery,
} from '../../../../_types/graphql';

export const useActiveVillageId = (): number | undefined => {
  const [activeVillageId, setActiveVillageId] = useState<number>();

  const activeVillageIdQueryResult = useQuery<IActiveVillageIdQuery>(ActiveVillageId);

  useEffect(() => {
    const { data, loading } = activeVillageIdQueryResult;

    if (loading || !data) {
      return;
    }

    setActiveVillageId(data.activeVillageId);
  }, [activeVillageIdQueryResult]);

  useSubscription<IActiveVillageIdChangedSubscription>(ActiveVillageIdChanged, {
    onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
      if (loading || !data) {
        return;
      }

      setActiveVillageId(data.activeVillageIdChanged);
    },
  });

  return activeVillageId;
};