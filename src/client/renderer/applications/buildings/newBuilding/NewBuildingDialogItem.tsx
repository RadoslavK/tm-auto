import { Dialog } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useState } from 'react';

import { BuildingType } from '../../../../../_shared/types/buildingType';
import { useEnqueueBuildingMutation } from '../../../hooks/buildings/useEnqueueBuildingMutation';
import { useBuildingInfo } from '../../../hooks/useBuildingInfo';
import { imageLinks } from '../../../utils/imageLinks';
import { MultiLevelDialog } from '../multiLevelDialog/MultiLevelDialog';

type StylesProps = {
  readonly buildingType: BuildingType;
};

const useStyles = makeStyles<unknown, StylesProps>({
  image: props => ({
    backgroundImage: `url("${imageLinks.getBuilding(props.buildingType)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 96,
    margin: '0 auto',
    width: 96,
  }),
  name: {
    textAlign: 'center',
  },
});

type Props = {
  readonly className?: string;
  readonly fieldId: number;
  readonly onSelect: (targetLevel?: number) => void;
  readonly type: BuildingType
};

export const NewBuildingDialogItem: React.FC<Props> = ({ className, fieldId, onSelect, type }) => {
  const [showMultiEnqueue, setShowMultiEnqueue] = useState(false);
  const classes = useStyles({
    buildingType: type,
  });

  const buildingInfo = useBuildingInfo(type);

  const enqueue = useEnqueueBuildingMutation({
    buildingType: type,
    fieldId,
  });

  if (!buildingInfo) {
    return null;
  }

  const {
    maxLevel,
    name,
  } = buildingInfo;

  const onClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>): Promise<void> => {
    if (event.ctrlKey) {
      setShowMultiEnqueue(true);
    } else {
      enqueue(event.shiftKey ? maxLevel : undefined);
      onSelect();
    }
  };

  return (
    <>
      <div
        className={className}
        onClick={onClick}
      >
        <div className={classes.image} />
        <div className={classes.name}>{name}</div>
      </div>
      <Dialog
        onClose={() => setShowMultiEnqueue(false)}
        open={showMultiEnqueue}
      >
        <MultiLevelDialog
          maxLevel={maxLevel}
          minLevel={1}
          onSelect={(targetLevel: number) => {
            setShowMultiEnqueue(false);
            enqueue(targetLevel);
            onSelect();
          }}
        />
      </Dialog>
    </>
  );
};
