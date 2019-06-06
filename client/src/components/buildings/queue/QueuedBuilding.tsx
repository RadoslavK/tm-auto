import React from 'react';
import PropTypes from 'prop-types';
import { buildingNames } from '../../../../../server/src/controller/constants/buildingNames';
import { IQueuedBuilding } from '../../../_types/graphql';

interface IProps {
  readonly queuedBuilding: IQueuedBuilding;
}

const propTypes: PropTypesShape<IProps> = {
  queuedBuilding: PropTypes.shape({}).isRequired,
};

const QueuedBuilding:  React.FunctionComponent<IProps> = (props) => {
  return (
    <div>
      [{props.queuedBuilding.fieldId}]: {buildingNames[props.queuedBuilding.buildingType]}
    </div>
  );
};

QueuedBuilding.displayName = 'QueuedBuilding';
QueuedBuilding.propTypes = propTypes;

export { QueuedBuilding };
