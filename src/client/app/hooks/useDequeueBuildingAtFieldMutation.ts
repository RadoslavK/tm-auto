import {
  MutationTuple,
  useMutation,
} from '@apollo/react-hooks';

import { DequeueBuildingAtField } from '*/graphql_operations/queuedBuilding.graphql';

import {
  IDequeueBuildingAtFieldMutation, IDequeueBuildingAtFieldMutationVariables,
} from '../../_types/graphql';
import { useVillageContext } from './useVillageContext';

interface IParams {
  readonly deleteAll: boolean;
  readonly fieldId: number;
}

export const useDequeueBuildingAtFieldMutation = (params: IParams): MutationTuple<IDequeueBuildingAtFieldMutation, IDequeueBuildingAtFieldMutationVariables> => {
  const {
    deleteAll,
    fieldId,
  } = params;

  const { villageId } = useVillageContext();

  return useMutation<IDequeueBuildingAtFieldMutation, IDequeueBuildingAtFieldMutationVariables>(DequeueBuildingAtField, {
    variables: {
      input: {
        deleteAll,
        villageId,
        fieldId,
      },
    },
  });
};
