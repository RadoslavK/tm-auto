import { Modal } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BuildingType } from '../../../../../server/src/_enums/BuildingType';
import { buildingNames } from '../../../../../server/src/constants/buildingNames';
import { IBuildingSpot} from '../../../_types/graphql';
import { useEnqueueBuildingMutation } from '../../../hooks/useEnqueueBuildingMutation';
import { imageLinks } from '../../../utils/imageLinks';
import { NewBuildingDialog } from '../newBuilding/NewBuildingDialog';

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

  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const enqueue = useEnqueueBuildingMutation({
    buildingType: building.type,
    fieldId: building.fieldId,
  });

  const onClick = async () => {
    if (building.type !== BuildingType.None) {
      await enqueue();
    } else {
      setIsDialogOpened(true);
    }
  };

  const onSelect = () => setIsDialogOpened(false);

  return (
    <div>
      <button onClick={onClick}>
        <img src={imageLinks.getBuilding(building.type)} />
        <span>{buildingNames[building.type]}</span>:
        <span>{building.level.actual}</span> ->
        <span>{building.level.actual + building.level.inProgress + building.level.queued}</span>
      </button>
      <Modal
        open={isDialogOpened}
        onClose={onSelect}
      >
        <NewBuildingDialog fieldId={building.fieldId} onSelect={onSelect}/>
      </Modal>
    </div>
  );
};

BuildingSpot.propTypes = propTypes;
BuildingSpot.displayName = 'BuildingSpot';

export { BuildingSpot };