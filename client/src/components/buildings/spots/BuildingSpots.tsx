import PropTypes from 'prop-types';
import { GetBuildingSpots } from '*/graphql_operations/building.graphql';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import {
  IGetBuildingSpotsQuery,
  IGetBuildingSpotsQueryVariables,
} from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';
import { BuildingSpot } from './BuildingSpot';

const useStyles = makeStyles({
  buildingType: {
    flex: '1',
    flexWrap: 'wrap',
    display: 'flex',
  },
});

interface IProps {
  readonly className: string;
}

const propTypes: PropTypesShape<IProps> = {
  className: PropTypes.string.isRequired,
};

const mapBuilding = (building, index) => (
  <BuildingSpot key={index} building={building} />
);

const BuildingSpots: React.FunctionComponent<IProps> = (props) => {
  const {
    className,
  } = props;

  const classes = useStyles({});
  const { villageId } = useContext<IVillageContext>(VillageContext);
  const { data, loading } = useQuery<IGetBuildingSpotsQuery, IGetBuildingSpotsQueryVariables>(GetBuildingSpots, {
    variables: { villageId },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return null;
  }

  const { buildingSpots } = data;

  return (
    <div className={className}>
      <div className={classes.buildingType}>
        {buildingSpots.resources.wood.map(mapBuilding)}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.clay.map(mapBuilding)}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.iron.map(mapBuilding)}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.crop.map(mapBuilding)}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.infrastructure.map(mapBuilding)}
      </div>
    </div>
  );
};

BuildingSpots.displayName = 'BuildingSpots';
BuildingSpots.propTypes = propTypes;

export { BuildingSpots };
