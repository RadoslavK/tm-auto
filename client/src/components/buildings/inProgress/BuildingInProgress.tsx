import React from 'react';
import PropTypes from 'prop-types';
import { buildingNames } from '../../../../../server/src/constants/buildingNames';
import { IBuildingInProgress } from '../../../_types/graphql';
import { imageLinks } from '../../../utils/imageLinks';

interface IProps {
  readonly building: IBuildingInProgress;
}

const propTypes: PropTypesShape<IProps> = {
  building: PropTypes.shape({
    level: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
};

const BuildingInProgress: React.FunctionComponent<IProps> = (props) => {
  return (
    <div style={{ color: 'blue' }}>
      <img src={imageLinks.getBuilding(props.building.type)} />
      {buildingNames[props.building.type]}: {props.building.level} ({props.building.time})
    </div>
  );
};

BuildingInProgress.displayName = 'BuildingInProgress';
BuildingInProgress.propTypes = propTypes;

export { BuildingInProgress };