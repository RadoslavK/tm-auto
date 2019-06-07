import { DequeueBuilding, GetBuildingSpots, GetQueuedBuildings } from '*/graphql_operations/building.graphql';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import { IDequeueBuildingMutation, IDequeueBuildingMutationVariables, IQueuedBuilding } from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';

interface IProps {
  readonly building: IQueuedBuilding;
}

const propTypes: PropTypesShape<IProps> = {
  building: PropTypes.shape({
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    queueIndex: PropTypes.number.isRequired,
  }).isRequired,
};

const QueuedBuilding:  React.FunctionComponent<IProps> = (props) => {
  const {
    building,
  } = props;

  const { villageId } = useContext<IVillageContext>(VillageContext);

  const dequeue = useMutation<IDequeueBuildingMutation, IDequeueBuildingMutationVariables>(DequeueBuilding, {
    variables: {
      input: {
        villageId,
        queueIndex: building.queueIndex,
      },
    },
    refetchQueries: [
      { query: GetBuildingSpots, variables: { villageId } },
      { query: GetQueuedBuildings, variables: { villageId } },
    ],
  });

  const onDequeue = async () => await dequeue();

  return (
    <button onClick={onDequeue}>
      <div>{building.name}</div>
      <span>Level {building.level}</span>
    </button>
  );
};

QueuedBuilding.displayName = 'QueuedBuilding';
QueuedBuilding.propTypes = propTypes;

export { QueuedBuilding };
