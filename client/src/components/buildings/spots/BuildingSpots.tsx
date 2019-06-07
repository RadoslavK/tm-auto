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
import classNames = require('classnames');

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

interface IProps {
  readonly className: string;
}

const propTypes: PropTypesShape<IProps> = {
  className: PropTypes.string.isRequired,
};

const BuildingSpots: React.FunctionComponent<IProps> = (props) => {
  const {
    className,
  } = props;

  const classes = useStyles({});
  const villageContext = useContext<IVillageContext>(VillageContext);
  const { data, loading } = useQuery<IGetBuildingSpotsQuery, IGetBuildingSpotsQueryVariables>(GetBuildingSpots, {
    variables: {
      villageId: villageContext.villageId,
    },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return null;
  }

  const { buildingSpots } = data;

  return (
    <div className={classNames(className, classes.root)}>
      {buildingSpots.map((building, index) => (
        <BuildingSpot key={index} building={building} />
      ))}
    </div>
  );
};

BuildingSpots.displayName = 'BuildingSpots';
BuildingSpots.propTypes = propTypes;

export { BuildingSpots };
