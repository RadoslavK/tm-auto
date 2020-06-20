import {
  BuildingType,
  useGetBuildingInfoQuery,
} from '../../_graphql/graphqlHooks';

export const useBuildingInfo = (buildingType: BuildingType) => {
  const { data, loading } = useGetBuildingInfoQuery({
    fetchPolicy: 'cache-first',
    variables: { buildingType },
  });

  return loading || !data ? null : data.buildingInfo;
};
