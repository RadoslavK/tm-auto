import PropTypes from 'prop-types';
import React from 'react';
import { INewBuildingInfo } from '../../../_types/graphql';
import { useEnqueueBuildingMutation } from '../../../hooks/useEnqueueBuildingMutation';

interface IProps {
  readonly building: INewBuildingInfo,
  readonly fieldId: number;
  readonly onSelect: () => void;
}

const propTypes: PropTypesShape<IProps> = {
  building: PropTypes.shape({
    imageLink: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
  fieldId: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const NewBuildingItem: React.FunctionComponent<IProps> = (props) => {
  const {
    building,
    fieldId,
    onSelect,
  } = props;

  const enqueue = useEnqueueBuildingMutation({
    buildingType: building.type,
    fieldId,
  });

  const onClick = async () => {
    await enqueue();

    onSelect();
  };

  return (
    <button onClick={onClick}>
      <img src={building.imageLink} />
      {building.name}
    </button>
  )
};

NewBuildingItem.displayName = 'NewBuildingItem';
NewBuildingItem.propTypes = propTypes;

export { NewBuildingItem };
