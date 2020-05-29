import { useSubscription } from '@apollo/react-hooks';

import { UpdateVillage } from '*/graphql_operations/village.graphql';

import { UpdateVillageSubscription } from '../../../_graphql/types/graphql.type';

export const useOnVillageUpdate = (callback: () => void): void => {
  useSubscription<UpdateVillageSubscription>(UpdateVillage, {
    onSubscriptionData: callback,
  });
};