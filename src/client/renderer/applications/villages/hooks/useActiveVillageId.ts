import {
  useQuery,
  useSubscription,
} from '@apollo/client';
import {
  useEffect,
  useState,
} from 'react';

import {
  ActiveVillageId,
  ActiveVillageIdChanged,
} from '*/graphql_operations/village.graphql';

import {
  ActiveVillageIdChangedSubscription,
  ActiveVillageIdQuery,
} from '../../../_graphql/types/graphql.type';

export const useActiveVillageId = (): number | undefined => {
  const [activeVillageId, setActiveVillageId] = useState<number>();

  const activeVillageIdQueryResult = useQuery<ActiveVillageIdQuery>(ActiveVillageId);

  useEffect(() => {
    const { data, loading } = activeVillageIdQueryResult;

    if (loading || !data) {
      return;
    }

    setActiveVillageId(data.activeVillageId);
  }, [activeVillageIdQueryResult]);

  useSubscription<ActiveVillageIdChangedSubscription>(ActiveVillageIdChanged, {
    onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
      if (loading || !data) {
        return;
      }

      setActiveVillageId(data.activeVillageIdChanged);
    },
  });

  return activeVillageId;
};