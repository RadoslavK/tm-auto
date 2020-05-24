import { useSubscription } from '@apollo/react-hooks';

import { UpdateVillage } from '*/graphql_operations/village.graphql';

import { IUpdateVillageSubscription } from '../../../_types/graphql';

export const useOnVillageUpdate = (callback: () => void): void => {
  useSubscription<IUpdateVillageSubscription>(UpdateVillage, {
    onSubscriptionData: callback,
  });
};