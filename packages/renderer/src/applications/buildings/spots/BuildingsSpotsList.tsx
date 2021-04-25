import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';

import type { BuildingsSpotsList_buildingSpots$key } from '../../../_graphql/__generated__/BuildingsSpotsList_buildingSpots.graphql.js';
import { BuildingSpot } from './BuildingSpot.js';

const fragmentDef = graphql`
  fragment BuildingsSpotsList_buildingSpots on BuildingSpot @relay(plural: true) {
      id
      ...BuildingSpot_buildingSpot
  }
`;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: '1',
    flexWrap: 'wrap',
  },
});

type Props = {
  readonly buildingsKey: BuildingsSpotsList_buildingSpots$key;
};

export const BuildingsSpotsList: React.FC<Props> = ({ buildingsKey }) => {
  const classes = useStyles();
  const buildings = useFragment(fragmentDef, buildingsKey);

  return (
    <div className={classes.root}>
      {buildings.map(building => <BuildingSpot key={building.id} building={building} />)}
    </div>
  );
};

BuildingsSpotsList.displayName = 'BuildingsSpotsList';