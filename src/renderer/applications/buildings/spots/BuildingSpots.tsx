import makeStyles from '@material-ui/core/styles/makeStyles';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { BuildingSpot_buildingSpot$key } from '../../../_graphql/__generated__/BuildingSpot_buildingSpot.graphql';
import { BuildingSpotsQuery } from '../../../_graphql/__generated__/BuildingSpotsQuery.graphql';

import { BuildingSpot } from './BuildingSpot';

const useStyles = makeStyles({
  buildingType: {
    display: 'flex',
    flex: '1',
    flexWrap: 'wrap',
  },
});

type Props = {
  readonly className: string;
};

const mapBuilding = (
  building: BuildingSpot_buildingSpot$key,
  index: number,
): JSX.Element => <BuildingSpot key={index} building={building} />;

const buildingSpotsQuery = graphql`
  query BuildingSpotsQuery($villageId: ID!) {
      buildingSpots(villageId: $villageId) {
          infrastructure {
              ...BuildingSpot_buildingSpot
          }
          resources {
              wood {
                  ...BuildingSpot_buildingSpot
              }
              clay {
                  ...BuildingSpot_buildingSpot
              }
              iron {
                  ...BuildingSpot_buildingSpot
              }
              crop {
                  ...BuildingSpot_buildingSpot
              }
          }
      }
  }
`;

export const BuildingSpots: React.FC<Props> = ({ className }) => {
  const villageId = '';
  const { buildingSpots } = useLazyLoadQuery<BuildingSpotsQuery>(buildingSpotsQuery, { villageId });
  const classes = useStyles({});

  return (
    <div className={className}>
      <div className={classes.buildingType}>
        {buildingSpots.resources.wood.map((x, i) => mapBuilding(x, i))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.clay.map((x, i) => mapBuilding(x, i))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.iron.map((x, i) => mapBuilding(x, i))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.crop.map((x, i) => mapBuilding(x, i))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.infrastructure.map((x, i) => mapBuilding(x, i))}
      </div>
    </div>
  );
};
