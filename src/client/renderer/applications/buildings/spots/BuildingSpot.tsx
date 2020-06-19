import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';

import { BuildingSpot as BuildingSpotModel } from '../../../_graphql/graphqlHooks';
import { BuildingType } from '../../../../../_shared/types/buildingType';
import { useDequeueBuildingAtFieldMutation } from '../../../hooks/buildings/useDequeueBuildingAtFieldMutation';
import { useEnqueueBuildingMutation } from '../../../hooks/buildings/useEnqueueBuildingMutation';
import { useBuildingInfo } from '../../../hooks/useBuildingInfo';
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
  root: props => ({
    alignItems: 'flex-start',
    justifyContent: props.building.type === BuildingType.None ? 'flex-end' : 'space-between',
    backgroundImage: `url("${imageLinks.getBuilding(props.building.type)}")`,
    backgroundSize: 'contain',
    border: '1px solid black',
    display: 'flex',
    flexFlow: 'column',
    height: '6rem',
    width: '6rem',
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

  const buildingInfo = useBuildingInfo(building.type);

  if (!buildingInfo) {
    return null;
  }

  const {
    maxLevel,
    name,
  } = buildingInfo;

  const onEnqueue = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (building.type > 0 && building.level.total >= maxLevel) {
      return;
    }

    if (building.type > 0) {
      if (building.level.total === maxLevel) {
        return;
      }

      if (event.ctrlKey) {
        setDialog(DialogType.MultiEnqueue);
      } else if (event.shiftKey) {
        enqueue(maxLevel);
      } else {
        enqueue();
      }
    } else {
      setDialog(DialogType.NewBuilding);
    }
  };

  const onDequeue = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (!building.level.queued) {
      return;
    }

    if (event.ctrlKey) {
      dequeueAll();
    } else {
      dequeue();
    }
  };

  const onSelect = (): void => {
    setDialog(DialogType.None);
  };

  return (
    <>
      <div
        className={clsx(className, classes.root)}
        onClick={onEnqueue}
        onContextMenu={onDequeue}
        title={name}
      >
        {building.type > 0 && (
          <BuildingLevelBox
            level={building.level}
            maxLevel={maxLevel}
          />
        )}
        <div className={classes.fieldId}>
          [{building.fieldId}]
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
          maxLevel={maxLevel}
          onSelect={onSelect}
          totalLevel={building.level.total}
        />
      </Dialog>
    </>
  );
});
