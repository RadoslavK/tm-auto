import { useContext } from 'react';
import {
  MutationTuple,
  useMutation,
} from '@apollo/react-hooks';
import { DequeueBuildingAtField } from '*/graphql_operations/queuedBuilding.graphql';
import { IDequeueBuildingAtFieldMutation, IDequeueBuildingAtFieldMutationVariables } from '../../_types/graphql';
import { IVillageContext, VillageContext } from '../components/villages/context/VillageContext';

interface IParams {
  readonly deleteAll: boolean;
  readonly fieldId: number;
}

export const useDequeueBuildingAtFieldMutation = (params: IParams): MutationTuple<IDequeueBuildingAtFieldMutation, IDequeueBuildingAtFieldMutationVariables> => {
  const {
    deleteAll,
    fieldId,
  } = params;

  const { villageId } = useContext<IVillageContext>(VillageContext);

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
