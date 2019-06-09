import { Modal } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IBuildingSpot } from '../../../_types/graphql';
import { useDequeueBuildingAtFieldMutation } from '../../../hooks/useDequeueBuildingAtFieldMutation';
import { useEnqueueBuildingMutation } from '../../../hooks/useEnqueueBuildingMutation';
import { BuildingImage } from '../../images/BuildingImage';
import { MultiEnqueueDialog } from '../multiEnqueue/MultiEnqueueDialog';
import { NewBuildingDialog } from '../newBuilding/NewBuildingDialog';
import { BuildingLevelBox } from './BuildingLevelBox';

enum DialogType {
  None = 'None',
  NewBuilding = 'NewBuilding',
  MultiEnqueue = 'MultiEnqueue',
}

interface IProps {
  readonly building: IBuildingSpot;
}

const propTypes: PropTypesShape<IProps> = {
  building: PropTypes.shape({
    fieldId: PropTypes.number.isRequired,
    level: PropTypes.shape({
      actual: PropTypes.number.isRequired,
    }),
    type: PropTypes.number.isRequired,
  }).isRequired,
};

const BuildingSpot: React.FunctionComponent<IProps> = (props) => {
  const {
    building,
  } = props;


  const [dialog, setDialog] = useState(DialogType.None);
  const enqueue = useEnqueueBuildingMutation({
    buildingType: building.type,
    fieldId: building.fieldId,
  });
  const dequeue = useDequeueBuildingAtFieldMutation({
    deleteAll: false,
    fieldId: building.fieldId,

  });
  const dequeueAll = useDequeueBuildingAtFieldMutation({
    deleteAll: true,
    fieldId: building.fieldId,
  });

  const onEnqueue = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (building.level) {
      if (building.level.total === building.level.max) {
        return;
      }

      if (event.ctrlKey) {
        setDialog(DialogType.MultiEnqueue);
      } else {
        await enqueue();
      }
    } else {
      setDialog(DialogType.NewBuilding);
    }
  };

  const onDequeue = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (event.ctrlKey) {
      await dequeueAll();
    } else {
      await dequeue();
    }
  };

  const onSelect = () => setDialog(DialogType.None);

  return (
    <div>
      <div title={building.name} onClick={onEnqueue}>
        <BuildingImage buildingType={building.type} />
        {building.level && (
          <>
            <BuildingLevelBox level={building.level}/>
            {building.level.queued > 0 && (
              <button onClick={onDequeue}>
                Dequeue
              </button>
            )}
          </>
        )}
      </div>
      <Modal
        open={dialog === DialogType.NewBuilding}
        onClose={onSelect}
      >
        <NewBuildingDialog fieldId={building.fieldId} onSelect={onSelect}/>
      </Modal>
      {building.level && (
        <Modal
          open={dialog === DialogType.MultiEnqueue}
          onClose={onSelect}
        >
          <MultiEnqueueDialog
            totalLevel={building.level.total}
            buildingType={building.type}
            fieldId={building.fieldId}
            maxLevel={building.level.max}
            onSelect={onSelect}
          />
        </Modal>
      )}
    </div>
  );
};

BuildingSpot.propTypes = propTypes;
BuildingSpot.displayName = 'BuildingSpot';

export { BuildingSpot };
