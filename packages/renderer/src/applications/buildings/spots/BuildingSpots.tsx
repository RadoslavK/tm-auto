import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { Suspense } from 'react';
import { useFragment } from 'react-relay/hooks';

import type { BuildingSpots_buildingSpots$key } from '../../../_graphql/__generated__/BuildingSpots_buildingSpots.graphql.js';
import { BuildingSpot } from './BuildingSpot.js';

const buildingSpotsFragment = graphql`
  fragment BuildingSpots_buildingSpots on BuildingSpots {
      infrastructure {
          id
          ...BuildingSpot_buildingSpot
      }
      resources {
          wood {
              id
              ...BuildingSpot_buildingSpot
          }
          clay {
              id
              ...BuildingSpot_buildingSpot
          }
          iron {
              id
              ...BuildingSpot_buildingSpot
          }
          crop {
              id
              ...BuildingSpot_buildingSpot
          }
      }
  }
`;

const useStyles = makeStyles({
  buildingType: {
    display: 'flex',
    flex: '1',
    flexWrap: 'wrap',
  },
});

type Props = {
  readonly buildingSpotsKey: BuildingSpots_buildingSpots$key;
  readonly className: string;
  readonly villageId: string;
};

export const BuildingSpots: React.FC<Props> = ({
  buildingSpotsKey,
  className,
  villageId,
}) => {
  const classes = useStyles({});
  const buildingSpots = useFragment(buildingSpotsFragment, buildingSpotsKey);

  return (
    <div className={className}>
      <div className={classes.buildingType}>
        {buildingSpots.resources.wood.map((building) => (
          <Suspense key={building.id} fallback={null}>
            <BuildingSpot building={building} villageId={villageId} />
          </Suspense>
        ))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.clay.map((building) => (
          <Suspense key={building.id} fallback={null}>
            <BuildingSpot building={building} villageId={villageId} />
          </Suspense>
        ))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.iron.map((building) => (
          <Suspense key={building.id} fallback={null}>
            <BuildingSpot building={building} villageId={villageId} />
          </Suspense>
        ))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.crop.map((building) => (
          <Suspense key={building.id} fallback={null}>
            <BuildingSpot building={building} villageId={villageId} />
          </Suspense>
        ))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.infrastructure.map((building) => (
          <Suspense key={building.id} fallback={null}>
            <BuildingSpot building={building} villageId={villageId} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

BuildingSpots.displayName = 'BuildingSpots';