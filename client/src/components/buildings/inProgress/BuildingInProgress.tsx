import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatTimeFromSeconds } from '../../../../../server/src/utils/formatTime';
import { IBuildingInProgress } from '../../../_types/graphql';
import { BuildingImage } from '../../images/BuildingImage';

interface IProps {
  readonly building: IBuildingInProgress;
}

const propTypes: PropTypesShape<IProps> = {
  building: PropTypes.shape({
    level: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
};

const BuildingInProgress: React.FunctionComponent<IProps> = (props) => {
  const {
    building,
  } = props;

  const [timer, setTimer] = useState(building.timer);

  useEffect(() => {
    const intervalId = setInterval(
      () => setTimer(prevTimer => prevTimer - 1),
      1000,
    );

    return () => clearInterval(intervalId);
  }, [ building.timer ]);

  if (timer <= 0) {
    return null;
  }
  
  const time = formatTimeFromSeconds(timer);

  return (
    <div style={{ color: 'blue' }}>
      <BuildingImage buildingType={building.type} />
      <div>{building.name}</div>
      <div>Level {building.level}</div>
      <div>{time}</div>
    </div>
  );
};

BuildingInProgress.displayName = 'BuildingInProgress';
BuildingInProgress.propTypes = propTypes;

export { BuildingInProgress };
