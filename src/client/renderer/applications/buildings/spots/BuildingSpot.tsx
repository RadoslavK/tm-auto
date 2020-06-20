import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';

import {
  BuildingSpot as BuildingSpotModel,
  BuildingType,
} from '../../../_graphql/graphqlHooks';
import { useBuildingInfo } from '../../../hooks/buildings/useBuildingInfo';
import { useDequeueBuildingAtFieldMutation } from '../../../hooks/buildings/useDequeueBuildingAtFieldMutation';
import { useEnqueueBuildingMutation } from '../../../hooks/buildings/useEnqueueBuildingMutation';
import { imageLinks } from '../../../utils/imageLinks';
import { MultiLevelDialog } from '../multiLevelDialog/MultiLevelDialog';
import { NewBuildingDialog } from '../newBuilding/NewBuildingDialog';
import { BuildingLevelBox } from './BuildingLevelBox';

enum DialogType {
  None,
  MultiDequeue,
  MultiEnqueue,
  NewBuilding,
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
  root: (props) => ({
    alignItems: 'flex-start',
    justifyContent:
      props.building.type === BuildingType.None ? 'flex-end' : 'space-between',
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
  const { building, className } = props;

  const classes = useStyles(props);
  const [dialog, setDialog] = useState(DialogType.None);

  const closeDialog = () => setDialog(DialogType.None);

  const enqueue = useEnqueueBuildingMutation({
    buildingType: building.type,
    fieldId: building.fieldId,
  });
  const dequeueAtField = useDequeueBuildingAtFieldMutation();

  const buildingInfo = useBuildingInfo(building.type);

  if (!buildingInfo) {
    return null;
  }

  const { maxLevel, name } = buildingInfo;

  const onEnqueue = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (
      building.type !== BuildingType.None &&
      building.level.total >= maxLevel
    ) {
      return;
    }

    if (building.type !== BuildingType.None) {
      if (event.ctrlKey) {
        setDialog(DialogType.MultiEnqueue);
      } else {
        enqueue(event.shiftKey ? maxLevel : undefined);
      }
    } else {
      setDialog(DialogType.NewBuilding);
    }
  };

  const onDequeue = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (!building.level.queued) {
      return;
    }

    if (event.ctrlKey) {
      setDialog(DialogType.MultiDequeue);
    } else {
      dequeueAtField({
        targetLevel: event.shiftKey
          ? building.level.ongoing || building.level.actual
          : undefined,
        fieldId: building.fieldId,
      });
    }
  };

  const onMultiLevelEnqueue = (targetLevel: number): void => {
    enqueue(targetLevel);
    closeDialog();
  };

  const onMultiLevelDequeue = (targetLevel: number): void => {
    dequeueAtField({
      targetLevel,
      fieldId: building.fieldId,
    });

    closeDialog();
  };

  return (
    <>
      <div
        className={clsx(className, classes.root)}
        onClick={onEnqueue}
        onContextMenu={onDequeue}
        title={name}>
        {building.type !== BuildingType.None && (
          <BuildingLevelBox level={building.level} maxLevel={maxLevel} />
        )}
        <div className={classes.fieldId}>[{building.fieldId}]</div>
      </div>
      <Dialog onClose={closeDialog} open={dialog === DialogType.NewBuilding}>
        <NewBuildingDialog fieldId={building.fieldId} onSelect={closeDialog} />
      </Dialog>
      <Dialog onClose={closeDialog} open={dialog === DialogType.MultiEnqueue}>
        <MultiLevelDialog
          maxLevel={maxLevel}
          minLevel={building.level.total + 1}
          onSelect={onMultiLevelEnqueue}
        />
      </Dialog>
      <Dialog onClose={closeDialog} open={dialog === DialogType.MultiDequeue}>
        {building.level.queued && (
          <MultiLevelDialog
            maxLevel={building.level.queued - 1}
            minLevel={building.level.ongoing || building.level.actual}
            onSelect={onMultiLevelDequeue}
          />
        )}
      </Dialog>
    </>
  );
});
