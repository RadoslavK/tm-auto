import React from 'react';
import PropTypes from 'prop-types';
import { buildingNames } from '../../../../../server/src/constants/buildingNames';
import { formatTime } from '../../../../../server/src/utils/formatTime';
import { IBuildingInProgress } from '../../../_types/graphql';

interface IProps {
  readonly building: IBuildingInProgress;
}

const propTypes: PropTypesShape<IProps> = {
  building: PropTypes.shape({
    level: PropTypes.number.isRequired,
    timer: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
};

const BuildingInProgress: React.FunctionComponent<IProps> = (props) => {
  const time = new Date(0, 0, 0, 0, 0, props.building.timer);

  return (
    <div style={{ color: 'blue' }}>
      {buildingNames[props.building.type]}: {props.building.level} ({formatTime(time)})
    </div>
  );
};

BuildingInProgress.displayName = 'BuildingInProgress';
BuildingInProgress.propTypes = propTypes;

export { BuildingInProgress };
