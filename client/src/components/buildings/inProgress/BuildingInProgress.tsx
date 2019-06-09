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

  const [timer, setTimer] = useState(building.timer > 0 ? building.timer : 0);

  useEffect(() => {
    const intervalId = setInterval(
      () =>  {
        if (timer <= 0) {
          clearInterval(intervalId);
        } else {
          setTimer(prevTimer => prevTimer - 1);
        }
      },
      1000,
    );

    return () => clearInterval(intervalId);
  }, [ building.timer ]);

  const time = formatTimeFromSeconds(timer);

  return (
    <div>
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
