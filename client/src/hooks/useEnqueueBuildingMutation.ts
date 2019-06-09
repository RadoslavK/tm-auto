import { GetBuildingSpots } from '*/graphql_operations/building.graphql';
import { EnqueueBuilding, GetQueuedBuildings } from '*/graphql_operations/queuedBuilding.graphql';
import { useContext } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { IEnqueueBuildingMutation, IEnqueueBuildingMutationVariables } from '../_types/graphql';
import { IVillageContext, VillageContext } from '../components/villages/context/VillageContext';

interface IParams {
  readonly buildingType: number
  readonly fieldId: number;
  readonly levels?: number;
}

export const useEnqueueBuildingMutation = (params: IParams) => {
  const { villageId } = useContext<IVillageContext>(VillageContext);

  const {
    buildingType,
    fieldId,
    levels = 1,
  } = params;

  return useMutation<IEnqueueBuildingMutation, IEnqueueBuildingMutationVariables>(EnqueueBuilding, {
    variables: {
      input: {
        type: buildingType,
        fieldId,
        levels,
        villageId,
      },
    },
    refetchQueries: [
      { query: GetBuildingSpots, variables: { villageId } },
      { query: GetQueuedBuildings, variables: { villageId } },
    ]
  });
};
