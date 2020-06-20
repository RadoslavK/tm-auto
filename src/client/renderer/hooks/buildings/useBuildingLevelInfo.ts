import {
  BuildingType,
  useGetBuildingLevelInfoQuery,
} from '../../_graphql/graphqlHooks';

export const useBuildingLevelInfo = (
  buildingType: BuildingType,
  level: number,
) => {
  const { data, loading } = useGetBuildingLevelInfoQuery({
    fetchPolicy: 'cache-first',
    variables: { buildingType, level },
  });

  return loading || !data ? null : data.buildingLevelInfo;
};
