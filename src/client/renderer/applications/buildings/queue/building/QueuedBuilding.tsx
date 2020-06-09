import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  DragPreviewImage,
  useDrag,
} from 'react-dnd';

import { QueuedBuilding as QueuedBuildingModel } from '../../../../_graphql/graphqlHooks';
import {
  BuildingImageSize,
  imageLinks,
} from '../../../../utils/imageLinks';
import {
  DropPosition,
  QueuedBuildingsDropArea,
} from '../QueuedBuildingsDropArea';
import { QueuedBuildingComponent } from './QueuedBuildingComponent';

type StylesProps = {
  readonly isDragging: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: {
    opacity: props => props.isDragging ? 0.5 : 1,
  },
});

type Props = {
  readonly building: QueuedBuildingModel;
  readonly onCollapse? : () => void;
};

export const QueuedBuilding: React.FC<Props> = ({ building, onCollapse }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'QueuedBuilding', building },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const classes = useStyles({ isDragging });

  return (
    <QueuedBuildingsDropArea
      getDropPosition={queueIndex => queueIndex > building.queueIndex
        ? DropPosition.Above
        : DropPosition.Below}
      queueIndexBot={building.queueIndex}
      queueIndexTop={building.queueIndex}
    >
      <div
        ref={drag}
        className={classes.root}
      >
        <DragPreviewImage
          connect={preview}
          src={imageLinks.getBuilding(building.type, BuildingImageSize.Small)}
        />
        <QueuedBuildingComponent
          building={building}
          onCollapse={onCollapse}
        />
      </div>
    </QueuedBuildingsDropArea>
  );
};
