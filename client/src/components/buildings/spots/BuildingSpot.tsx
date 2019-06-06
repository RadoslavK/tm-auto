import React from 'react';
import PropTypes from 'prop-types';
import { buildingNames } from '../../../../../server/src/controller/constants/buildingNames';
import { IBuilding } from '../../../_types/graphql';

interface IProps {
  readonly building: IBuilding;
}

const propTypes: PropTypesShape<IProps> = {
  building: PropTypes.shape({
    type: PropTypes.number.isRequired,
    level: PropTypes.shape({
      actual: PropTypes.number.isRequired,
      ongoing: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

const BuildingSpot: React.FunctionComponent<IProps> = (props) => {
  const {
    building,
  } = props;

  return (
    <div>
      <button>
        <span>{buildingNames[building.type]}</span>:
        <span>{building.level.actual}</span> ->
        <span>{building.level.actual + building.level.ongoing}</span>
      </button>
    </div>
  );
};

BuildingSpot.propTypes = propTypes;
BuildingSpot.displayName = 'BuildingSpot';

export { BuildingSpot };
