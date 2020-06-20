import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';

import { QueuedBuildingRange as QueuedBuildingRangeModel } from '../../../../_graphql/graphqlHooks';
import { BuildingImageSize, imageLinks } from '../../../../utils/imageLinks';
import {
  DropPosition,
  QueuedBuildingsDropArea,
} from '../QueuedBuildingsDropArea';
import { QueuedBuildingRangeComponent } from './QueuedBuildingRangeComponent';

type StylesProps = {
  readonly isDragging: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: {
    opacity: (props) => (props.isDragging ? 0.5 : 1),
  },
});

type Props = {
  readonly onExpand: () => void;
  readonly range: QueuedBuildingRangeModel;
};

export const QueuedBuildingRange: React.FC<Props> = ({ onExpand, range }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'QueuedBuildingRange', range },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const classes = useStyles({ isDragging });

  return (
    <QueuedBuildingsDropArea
      getDropPosition={(queueIndex) =>
        queueIndex > range.buildings[0].queueIndex
          ? DropPosition.Above
          : DropPosition.Below
      }
      queueIndexBot={range.buildings[range.buildings.length - 1].queueIndex}
      queueIndexTop={range.buildings[0].queueIndex}>
      <div ref={drag} className={classes.root}>
        <DragPreviewImage
          connect={preview}
          src={imageLinks.getBuilding(range.type, BuildingImageSize.Small)}
        />
        <QueuedBuildingRangeComponent
          buildingRange={range}
          onExpand={onExpand}
        />
      </div>
    </QueuedBuildingsDropArea>
  );
};
