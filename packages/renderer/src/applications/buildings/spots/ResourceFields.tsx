import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';
import { BuildingType } from 'shared/enums/BuildingType.js';

import type { ResourceFieldsQuery } from '../../../_graphql/__generated__/ResourceFieldsQuery.graphql.js';
import { BuildingsSpotsList } from './BuildingsSpotsList.js';

export const resourceFieldsQuery = graphql`
    query ResourceFieldsQuery($villageId: ID!) {
        resourceFields(villageId: $villageId) {
            type
            ...BuildingsSpotsList_buildingSpots
        }
    }
`;

type Props = {
  readonly queryRef: PreloadedQuery<ResourceFieldsQuery>;
};

export const ResourceFields: React.FC<Props> = ({ queryRef }) => {
  const { resourceFields } = usePreloadedQuery(resourceFieldsQuery, queryRef);

  const buildingsByType = useMemo(() => {
    const wood = resourceFields.filter(f => f.type === BuildingType.Wood);
    const clay = resourceFields.filter(f => f.type === BuildingType.Clay);
    const iron = resourceFields.filter(f => f.type === BuildingType.Iron);
    const crop = resourceFields.filter(f => f.type === BuildingType.Crop);

    return { wood, clay, iron, crop };
  }, [resourceFields]);

  return (
    <>
      <BuildingsSpotsList buildingsKey={buildingsByType.wood} />
      <BuildingsSpotsList buildingsKey={buildingsByType.clay} />
      <BuildingsSpotsList buildingsKey={buildingsByType.iron} />
      <BuildingsSpotsList buildingsKey={buildingsByType.crop} />
    </>
  );
};

ResourceFields.displayName = 'ResourceFields';