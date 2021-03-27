import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  DragPreviewImage,
  useDrag, 
} from 'react-dnd';
import { useFragment } from 'react-relay/hooks';

import type { QueuedBuilding_queuedBuilding$key } from '../../../../_graphql/__generated__/QueuedBuilding_queuedBuilding.graphql.js';
import {
  BuildingImageSize,
  imageLinks, 
} from '../../../../utils/imageLinks.js';
import {
  DropPosition,
  MovedQueuedBuilding,
  QueuedBuildingsDropArea,
} from '../QueuedBuildingsDropArea.js';
import { QueuedBuildingComponent } from './QueuedBuildingComponent.js';

type StylesProps = {
  readonly isDragging: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: {
    opacity: (props) => (props.isDragging ? 0.5 : 1),
  },
});

type Props = {
  readonly building: QueuedBuilding_queuedBuilding$key;
  readonly onCollapse?: () => void;
  readonly villageId: string;
};

const queuedBuildingQueuedBuildingFragment = graphql`
  fragment QueuedBuilding_queuedBuilding on QueuedBuilding {
      queueIndex
      queueId
      type
      ...QueuedBuildingComponent_queuedBuilding
  }
`;

export const QueuedBuilding: React.FC<Props> = ({ building, onCollapse, villageId }) => {
  const queuedBuildingFragment = useFragment(queuedBuildingQueuedBuildingFragment, building);

  const movedBuilding: MovedQueuedBuilding = {
    buildingFragmentKey: queuedBuildingFragment,
    queueId: queuedBuildingFragment.queueId,
    queueIndex: queuedBuildingFragment.queueIndex,
  };

  const [{ isDragging }, drag, preview] = useDrag({
    item: movedBuilding,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type: 'QueuedBuilding',
  });

  const classes = useStyles({ isDragging });

  return (
    <QueuedBuildingsDropArea
      getDropPosition={(queueIndex) =>
        queueIndex > queuedBuildingFragment.queueIndex
          ? DropPosition.Above
          : DropPosition.Below
      }
      queueIndexBot={queuedBuildingFragment.queueIndex}
      queueIndexTop={queuedBuildingFragment.queueIndex}
      villageId={villageId}
    >
      <div ref={drag} className={classes.root}>
        <DragPreviewImage
          connect={preview}
          src={imageLinks.getBuilding(queuedBuildingFragment.type, BuildingImageSize.Small)}
        />
        <QueuedBuildingComponent building={queuedBuildingFragment} onCollapse={onCollapse} villageId={villageId} />
      </div>
    </QueuedBuildingsDropArea>
  );
};
