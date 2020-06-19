import { useGetBuildingInfoQuery } from '../../_graphql/graphqlHooks';
import { BuildingType } from '../../../../_shared/types/buildingType';

export const useBuildingInfo = (buildingType: BuildingType) => {
  const { data, loading } = useGetBuildingInfoQuery({
    fetchPolicy: 'cache-first',
    variables: { buildingType },
  });

  return loading || !data
    ? null
    : data.buildingInfo;
};