import { GetBuildingSpots } from '*/graphql_operations/building.graphql';
import { ClearQueue, GetQueuedBuildings } from '*/graphql_operations/queuedBuilding.graphql';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import {
  IClearQueueMutation, IClearQueueMutationVariables, IGetQueuedBuildingsQuery,
  IGetQueuedBuildingsQueryVariables,
} from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';
import { Cost } from './Cost';
import { QueuedBuilding } from './QueuedBuilding';

interface IProps {
  readonly className: string;
}

const propTypes: PropTypesShape<IProps> = {
  className: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  action: {
    width: '100%',
    marginBottom: '15px',
  },
  buildings: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const BuildingQueue: React.FunctionComponent<IProps> = (props) => {
  const {
    className
  } = props;

  const classes = useStyles({});

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
    buildingQueue,
  } = data;

  const onClear = async () => await clearQueue();

  return (
    <div className={className}>
      <button onClick={onClear} className={classes.action}>
        Clear queue
      </button>
      <Cost cost={buildingQueue.totalCost} />
      <div className={classes.buildings}>
        {buildingQueue.buildings.map((building, index) => (
          <QueuedBuilding key={index} building={building}/>
        ))}
      </div>
    </div>
  )
};

BuildingQueue.displayName = 'BuildingQueue';
BuildingQueue.propTypes = propTypes;

export { BuildingQueue };
