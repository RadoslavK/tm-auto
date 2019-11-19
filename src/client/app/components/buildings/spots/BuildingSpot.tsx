import { Dialog, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import classNames from 'classnames';
import { IBuildingSpot } from '../../../../_types/graphql';
import { useDequeueBuildingAtFieldMutation } from '../../../hooks/useDequeueBuildingAtFieldMutation';
import { useEnqueueBuildingMutation } from '../../../hooks/useEnqueueBuildingMutation';
import { imageLinks } from '../../../../utils/imageLinks';
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
  readonly className?: string;
}

const useStyles = makeStyles<unknown, IProps>({
  root: props => ({
    height: '108px',
    width: '108px',
    border: '1px solid black',
    backgroundImage: `url("${imageLinks.getBuilding(props.building.type)}")`,
    backgroundSize: 'contain',
  }),
});

export const BuildingSpot: React.FC<IProps> = React.memo((props) => {
  const {
    building,
    className,
  } = props;

  const classes = useStyles(props);
  const [dialog, setDialog] = useState(DialogType.None);
  const [enqueue] = useEnqueueBuildingMutation({
    buildingType: building.type,
    fieldId: building.fieldId,
  });
  const [dequeue] = useDequeueBuildingAtFieldMutation({
    deleteAll: false,
    fieldId: building.fieldId,
  });
  const [dequeueAll] = useDequeueBuildingAtFieldMutation({
    deleteAll: true,
    fieldId: building.fieldId,
  });

  const onEnqueue = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    if (building.type > 0) {
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

  const onDequeue = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    event.stopPropagation();

    if (event.ctrlKey) {
      await dequeueAll();
    } else {
      await dequeue();
    }
  };

  const onSelect = (): void => {
    setDialog(DialogType.None);
  };

  return (
    <>
      <div className={classNames(className, classes.root)} title={building.name}>
        {building.type > 0 && (
          <BuildingLevelBox level={building.level} />
        )}
        <div>
          <button type="button" disabled={building.type > 0 && building.level.total === building.level.max} onClick={onEnqueue}>
            +
          </button>
          {building.level.queued > 0 && (
            <button type="button" disabled={!building.level.queued} onClick={onDequeue}>
              -
            </button>
          )}
        </div>
      </div>
      <Dialog
        open={dialog === DialogType.NewBuilding}
        onClose={onSelect}
      >
        <NewBuildingDialog fieldId={building.fieldId} onSelect={onSelect}/>
      </Dialog>
      <Dialog
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
      </Dialog>
    </>
  );
});