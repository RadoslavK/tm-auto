import { GetBuildingsInProgress } from '*/graphql_operations/building.graphql';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { IGetBuildingsInProgressQuery, IGetBuildingsInProgressQueryVariables } from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';
import { BuildingInProgress } from './BuildingInProgress';

interface IProps {
  readonly className: string;
}

const propTypes: PropTypesShape<IProps> = {
  className: PropTypes.string.isRequired,
};


const BuildingsInProgress: React.FunctionComponent<IProps> = (props) => {
  const {
    className,
  } = props;

  const { villageId }= useContext<IVillageContext>(VillageContext);

  const { data, loading } = useQuery<IGetBuildingsInProgressQuery, IGetBuildingsInProgressQueryVariables>(GetBuildingsInProgress, {
    variables: { villageId },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return null;
  }

  return (
    <div className={className}>
      {data.buildingsInProgress.map((building, index) => (
        <BuildingInProgress key={index} building={building} />
      ))}
    </div>
  )
};

BuildingsInProgress.displayName = 'BuildingsInProgress';
BuildingsInProgress.propTypes = propTypes;

export { BuildingsInProgress };
