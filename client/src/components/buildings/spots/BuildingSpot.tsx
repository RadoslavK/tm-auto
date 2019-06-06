import { EnqueueBuilding, GetQueuedBuildings, GetBuildingSpots } from '*/graphql_operations/building.graphql';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import { buildingNames } from '../../../../../server/src/controller/constants/buildingNames';
import { IBuildingSpot, IEnqueueBuildingMutation, IEnqueueBuildingMutationVariables } from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';

interface IProps {
  readonly building: IBuildingSpot;
}

const propTypes: PropTypesShape<IProps> = {
  building: PropTypes.shape({
    fieldId: PropTypes.number.isRequired,
    level: PropTypes.shape({
      actual: PropTypes.number.isRequired,
      inProgress: PropTypes.number.isRequired,
      queued: PropTypes.number.isRequired
    }).isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
};

const BuildingSpot: React.FunctionComponent<IProps> = (props) => {
  const {
    building,
  } = props;

  const villageContext = useContext<IVillageContext>(VillageContext);
  const enqueue = useMutation<IEnqueueBuildingMutation, IEnqueueBuildingMutationVariables>(EnqueueBuilding, {
    variables: {
      input: {
        villageId: villageContext.villageId,
        type: building.type,
        fieldId: building.fieldId,
      },
    },
    refetchQueries: [
      { query: GetBuildingSpots, variables: { villageId: villageContext.villageId } },
      { query: GetQueuedBuildings, variables: { villageId: villageContext.villageId } },
    ]
  });

  return (
    <div>
      <button onClick={async (e) => {
        e.preventDefault();

        await enqueue();
      }}>
        <span>{buildingNames[building.type]}</span>:
        <span>{building.level.actual}</span> ->
        <span>{building.level.actual + building.level.inProgress + building.level.queued}</span>
      </button>
    </div>
  );
};

BuildingSpot.propTypes = propTypes;
BuildingSpot.displayName = 'BuildingSpot';

export { BuildingSpot };
