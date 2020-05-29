import {
  MutationTuple,
  useMutation,
} from '@apollo/react-hooks';

import { DequeueBuildingAtField } from '*/graphql_operations/queuedBuilding.graphql';

import {
  DequeueBuildingAtFieldMutation,
  DequeueBuildingAtFieldMutationVariables,
} from '../../_graphql/types/graphql.type';
import { useVillageContext } from '../../applications/villages/context/villageContext';

type Params = {
  readonly deleteAll: boolean;
  readonly fieldId: number;
};

type ReturnType = MutationTuple<DequeueBuildingAtFieldMutation, DequeueBuildingAtFieldMutationVariables>;

export const useDequeueBuildingAtFieldMutation = ({ deleteAll, fieldId }: Params): ReturnType => {
  const { villageId } = useVillageContext();

  return useMutation<DequeueBuildingAtFieldMutation, DequeueBuildingAtFieldMutationVariables>(
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
