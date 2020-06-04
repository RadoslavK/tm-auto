import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  DragPreviewImage,
  useDrag,
} from 'react-dnd';

import { QueuedBuilding as QueuedBuildingModel } from '../../../_graphql/graphqlHooks';
import {
  BuildingImageSize,
  imageLinks,
} from '../../../utils/imageLinks';
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
  readonly queueIndex: number;
};

export const QueuedBuilding: React.FC<Props> = (props) => {
  const {
    building,
    queueIndex,
  } = props;

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'QueuedBuilding', queueId: building.queueId, buildingType: building.type, queueIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const classes = useStyles({ isDragging });

  return (
    <div
      ref={drag}
      className={classes.root}
    >
      <DragPreviewImage
        connect={preview}
        src={imageLinks.getBuilding(building.type, BuildingImageSize.Small)}
      />
      <QueuedBuildingComponent building={building} />
    </div>
  );
};
