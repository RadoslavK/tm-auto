import { EnqueueBuilding, GetBuildingSpots, GetQueuedBuildings } from "*/graphql_operations/building.graphql";
import { useContext } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { IEnqueueBuildingMutation, IEnqueueBuildingMutationVariables } from '../_types/graphql';
import { IVillageContext, VillageContext } from '../components/villages/context/VillageContext';

interface IParams {
  readonly buildingType: number;
  readonly fieldId: number;
}

export const useEnqueueBuildingMutation = (params: IParams) => {
  const { villageId } = useContext<IVillageContext>(VillageContext);

  const {
    buildingType,
    fieldId,
  } = params;

  return useMutation<IEnqueueBuildingMutation, IEnqueueBuildingMutationVariables>(EnqueueBuilding, {
    variables: {
      input: {
        villageId,
        type: buildingType,
        fieldId,
      },
    },
    refetchQueries: [
      { query: GetBuildingSpots, variables: { villageId } },
      { query: GetQueuedBuildings, variables: { villageId } },
    ]
  });
};
