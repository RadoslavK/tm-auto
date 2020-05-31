import { MutationTuple } from '@apollo/client';

import {
  DequeueBuildingAtFieldMutation,
  DequeueBuildingAtFieldMutationVariables,
  useDequeueBuildingAtFieldMutation as _useDequeueBuildingAtFieldMutation,
} from '../../_graphql/graphqlHooks';
import { useVillageContext } from '../../applications/villages/context/villageContext';

type Params = {
  readonly deleteAll: boolean;
  readonly fieldId: number;
};

type ReturnType = MutationTuple<DequeueBuildingAtFieldMutation, DequeueBuildingAtFieldMutationVariables>;

export const useDequeueBuildingAtFieldMutation = ({ deleteAll, fieldId }: Params): ReturnType => {
  const { villageId } = useVillageContext();

  return _useDequeueBuildingAtFieldMutation({
    variables: {
      input: {
        deleteAll,
        fieldId,
        villageId,
      },
    },
  });
};
