import {
  MutationTuple,
  useMutation,
} from '@apollo/react-hooks';

import { DequeueBuildingAtField } from '*/graphql_operations/queuedBuilding.graphql';

import {
  IDequeueBuildingAtFieldMutation,
  IDequeueBuildingAtFieldMutationVariables,
} from '../../_types/graphql';
import { useVillageContext } from '../useVillageContext';

type Params = {
  readonly deleteAll: boolean;
  readonly fieldId: number;
};

type ReturnType = MutationTuple<IDequeueBuildingAtFieldMutation, IDequeueBuildingAtFieldMutationVariables>;

export const useDequeueBuildingAtFieldMutation = ({ deleteAll, fieldId }: Params): ReturnType => {
  const { villageId } = useVillageContext();

  return useMutation<IDequeueBuildingAtFieldMutation, IDequeueBuildingAtFieldMutationVariables>(
    DequeueBuildingAtField,
    {
      variables: {
        input: {
          deleteAll,
          fieldId,
          villageId,
        },
      },
    },
  );
};
