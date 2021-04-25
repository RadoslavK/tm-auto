import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  DragPreviewImage,
  useDrag,
} from 'react-dnd';
import { useFragment } from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { QueuedBuilding_queuedBuilding$key } from '../../../../_graphql/__generated__/QueuedBuilding_queuedBuilding.graphql.js';
import { tribeState } from '../../../../_recoil/atoms/tribe.js';
import {
  BuildingImageSize,
  imageLinks,
} from '../../../../utils/imageLinks.js';
import type { MovedQueuedBuilding } from '../DroppedQueuedBuilding.js';
import {
  DropPosition,
  QueuedBuildingsDropArea,
} from '../QueuedBuildingsDropArea.js';
import { QueuedBuildingComponent } from './QueuedBuildingComponent.js';

type StylesProps = {
  readonly isDragging: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: {
    opacity: (props) => (props.isDragging ? 0.5 : 1),
    cursor: 'pointer',
  },
});

type Props = {
  readonly building: QueuedBuilding_queuedBuilding$key;
  readonly index: number;
  readonly isMergeable: boolean;
};

const queuedBuildingQueuedBuildingFragment = graphql`
  fragment QueuedBuilding_queuedBuilding on QueuedBuilding {
      id
      type
      ...QueuedBuildingComponent_queuedBuilding
  }
`;

export const QueuedBuilding: React.FC<Props> = ({
  building,
  index,
  isMergeable,
}) => {
  const queuedBuildingFragment = useFragment(queuedBuildingQueuedBuildingFragment, building);

  const movedBuilding: MovedQueuedBuilding = {
    buildingFragmentKey: queuedBuildingFragment,
    index,
    queueId: queuedBuildingFragment.id,
  };

  const [{ isDragging }, drag, preview] = useDrag({
    item: movedBuilding,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type: 'QueuedBuilding',
  });

  const classes = useStyles({ isDragging });
  const tribe = useRecoilValue(tribeState);

  return (
    <QueuedBuildingsDropArea
      getDropPosition={(queueIndex) =>
        queueIndex > index
          ? DropPosition.Above
          : DropPosition.Below
      }
      queueId={queuedBuildingFragment.id}
      index={index}
    >
      <DragPreviewImage
        connect={preview}
        src={imageLinks.getBuilding(queuedBuildingFragment.type, tribe, BuildingImageSize.Small)}
      />
      <div ref={drag} className={classes.root}>
        <QueuedBuildingComponent
          building={queuedBuildingFragment}
          isMergeable={isMergeable}
          showActions
        />
      </div>
    </QueuedBuildingsDropArea>
  );
};

QueuedBuilding.displayName = 'QueuedBuilding';