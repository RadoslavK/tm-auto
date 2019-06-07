import { ClearQueue, GetBuildingSpots, GetQueuedBuildings } from '*/graphql_operations/building.graphql';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import {
  IClearQueueMutation, IClearQueueMutationVariables,
  IGetQueuedBuildingsQuery,
  IGetQueuedBuildingsQueryVariables,
} from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';
import { QueuedBuilding } from './QueuedBuilding';

interface IProps {
  readonly className: string;
}

const propTypes: PropTypesShape<IProps> = {
  className: PropTypes.string.isRequired,
};

const BuildingQueue: React.FunctionComponent<IProps> = (props) => {
  const {
    className
  } = props;

  const { villageId } = useContext<IVillageContext>(VillageContext);
  const { data, loading } = useQuery<IGetQueuedBuildingsQuery, IGetQueuedBuildingsQueryVariables>(GetQueuedBuildings, {
    variables: { villageId },
    fetchPolicy: 'network-only',
  });

  const clearQueue = useMutation<IClearQueueMutation, IClearQueueMutationVariables>(ClearQueue, {
    variables: {villageId },
    refetchQueries: [
      { query: GetBuildingSpots, variables: { villageId } },
      { query: GetQueuedBuildings, variables: { villageId } },
    ],
  });

  if (loading) {
    return null;
  }

  const {
    queuedBuildings,
  } = data;

  return (
    <div className={className}>
      <button onClick={async e => {
        e.preventDefault();

        await clearQueue();
      }}>
        Clear queue
      </button>
      {queuedBuildings.map((building, index) => (
        <QueuedBuilding key={index} building={building}/>
      ))}
    </div>
  )
};

BuildingQueue.displayName = 'BuildingQueue';
BuildingQueue.propTypes = propTypes;

export { BuildingQueue };
