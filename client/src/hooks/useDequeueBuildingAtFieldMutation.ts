import { GetBuildingSpots } from '*/graphql_operations/building.graphql';
import { DequeueBuildingAtField, GetQueuedBuildings } from '*/graphql_operations/queuedBuilding.graphql';
import { useContext } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { IDequeueBuildingAtFieldMutation, IDequeueBuildingAtFieldMutationVariables } from '../_types/graphql';
import { IVillageContext, VillageContext } from '../components/villages/context/VillageContext';

interface IParams {
  readonly deleteAll: boolean;
  readonly fieldId: number;
}

export const useDequeueBuildingAtFieldMutation = (params: IParams) => {
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
    refetchQueries: [
      { query: GetBuildingSpots, variables: { villageId } },
      { query: GetQueuedBuildings, variables: { villageId } },
    ]
  });
};
