import { useGetBuildingLevelInfoQuery } from '../../_graphql/graphqlHooks';
import { BuildingType } from '../../../../_shared/types/buildingType';

export const useBuildingLevelInfo = (buildingType: BuildingType, level: number) => {
  const { data, loading } = useGetBuildingLevelInfoQuery({
    fetchPolicy: 'cache-first',
    variables: { buildingType, level },
  });

  return loading || !data
    ? null
    : data.buildingLevelInfo;
};