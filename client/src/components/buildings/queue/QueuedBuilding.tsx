import { DequeueBuilding, GetBuildingSpots, GetQueuedBuildings } from '*/graphql_operations/building.graphql';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import { buildingNames } from '../../../../../server/src/controller/constants/buildingNames';
import { IDequeueBuildingMutation, IDequeueBuildingMutationVariables, IQueuedBuilding } from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';

interface IProps {
  readonly building: IQueuedBuilding;
}

const propTypes: PropTypesShape<IProps> = {
  building: PropTypes.shape({
    fieldId: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
    queueIndex: PropTypes.number.isRequired,
  }).isRequired,
};

const QueuedBuilding:  React.FunctionComponent<IProps> = (props) => {
  const {
    building,
  } = props;

  const villageContext = useContext<IVillageContext>(VillageContext);

  const dequeue = useMutation<IDequeueBuildingMutation, IDequeueBuildingMutationVariables>(DequeueBuilding, {
    variables: {
      input: {
        villageId: villageContext.villageId,
        queueIndex: building.queueIndex,
      },
    },
    refetchQueries: [
      { query: GetBuildingSpots, variables: { villageId: villageContext.villageId } },
      { query: GetQueuedBuildings, variables: { villageId: villageContext.villageId } },
    ],
  });

  return (
    <button onClick={async (e) => {
      e.preventDefault();

      await dequeue();
    }}>
      [{props.building.fieldId}]: {buildingNames[props.building.type]}
    </button>
  );
};

QueuedBuilding.displayName = 'QueuedBuilding';
QueuedBuilding.propTypes = propTypes;

export { QueuedBuilding };
