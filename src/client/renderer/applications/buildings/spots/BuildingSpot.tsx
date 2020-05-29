import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';

import { BuildingSpot as BuildingSpotModel } from '../../../_types/graphql';
import { useDequeueBuildingAtFieldMutation } from '../../../hooks/buildings/useDequeueBuildingAtFieldMutation';
import { useEnqueueBuildingMutation } from '../../../hooks/buildings/useEnqueueBuildingMutation';
import { imageLinks } from '../../../utils/imageLinks';
import { MultiEnqueueDialog } from '../multiEnqueue/MultiEnqueueDialog';
import { NewBuildingDialog } from '../newBuilding/NewBuildingDialog';
import { BuildingLevelBox } from './BuildingLevelBox';

enum DialogType {
  MultiEnqueue = 'MultiEnqueue',
  NewBuilding = 'NewBuilding',
  None = 'None'
}

type Props = {
  readonly building: BuildingSpotModel;
  readonly className?: string;
};

const useStyles = makeStyles<unknown, Props>({
  fieldId: {
    alignSelf: 'center',
    background: '#b1b5b9',
    fontWeight: 'bold',
  },
  queueButtons: ({ building }) => {
    const isMaxed = building.type > 0 && building.level.total === building.level.max;

    return {
      flex: 1,
      visibility: isMaxed ? 'hidden' : undefined,
    };
  },
  root: props => ({
    alignItems: 'flex-start',
    backgroundImage: `url("${imageLinks.getBuilding(props.building.type)}")`,
    backgroundSize: 'contain',
    border: '1px solid black',
    display: 'flex',
    flexFlow: 'column',
    height: '108px',
    width: '108px',
  }),
});

export const BuildingSpot: React.FC<Props> = React.memo((props) => {
  const {
    building,
    className,
  } = props;

  const classes = useStyles(props);
  const [dialog, setDialog] = useState(DialogType.None);
  const enqueue = useEnqueueBuildingMutation({
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
      } else if (event.shiftKey) {
        await enqueue(building.level.max);
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
      <div
        className={clsx(className, classes.root)}
        title={building.name}
      >
        {building.type > 0 && (
          <BuildingLevelBox level={building.level} />
        )}
        <div className={classes.queueButtons}>
          <button
            onClick={onEnqueue}
            type="button"
          >
            +
          </button>
          {building.level.queued > 0 && (
            <button
              onClick={onDequeue}
              type="button"
            >
              -
            </button>
          )}
        </div>
        <div className={classes.fieldId}>
          [
          {building.fieldId}
          ]
        </div>
      </div>
      <Dialog
        onClose={onSelect}
        open={dialog === DialogType.NewBuilding}
      >
        <NewBuildingDialog
          fieldId={building.fieldId}
          onSelect={onSelect}
        />
      </Dialog>
      <Dialog
        onClose={onSelect}
        open={dialog === DialogType.MultiEnqueue}
      >
        <MultiEnqueueDialog
          buildingType={building.type}
          fieldId={building.fieldId}
          maxLevel={building.level.max}
          onSelect={onSelect}
          totalLevel={building.level.total}
        />
      </Dialog>
    </>
  );
});