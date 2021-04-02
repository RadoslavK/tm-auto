import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  DragPreviewImage,
  useDrag, 
} from 'react-dnd';
import { useFragment } from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { QueuedBuildingRange_queuedBuildingRange$key } from '../../../../_graphql/__generated__/QueuedBuildingRange_queuedBuildingRange.graphql.js';
import { tribeState } from '../../../../_recoil/atoms/tribe.js';
import {
  BuildingImageSize,
  imageLinks,
} from '../../../../utils/imageLinks.js';
import type { MovedQueuedBuildingRange } from '../DroppedQueuedRange.js';
import {
  DropPosition,
  QueuedBuildingsDropArea,
} from '../QueuedBuildingsDropArea.js';
import { QueuedBuildingRangeComponent } from './QueuedBuildingRangeComponent.js';

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
  readonly range: QueuedBuildingRange_queuedBuildingRange$key;
};

const queuedBuildingRangeQueuedBuildingRangeFragment = graphql`
  fragment QueuedBuildingRange_queuedBuildingRange on QueuedBuildingRange {
      buildings {
          queueId
          queueIndex
      }
      type
      ...QueuedBuildingRangeComponent_QueuedBuildingRange
  }
`;

export const QueuedBuildingRange: React.FC<Props> = ({ onExpand, range }) => {
  const rangeFragment = useFragment(queuedBuildingRangeQueuedBuildingRangeFragment, range);

  const movedBuilding: MovedQueuedBuildingRange = {
    bottomBuildingQueueId: rangeFragment.buildings[rangeFragment.buildings.length - 1].queueId,
    topBuildingQueueId: rangeFragment.buildings[0].queueId,
    topBuildingQueueIndex: rangeFragment.buildings[0].queueIndex,
    rangeFragmentKey: rangeFragment,
  };

  const [{ isDragging }, drag, preview] = useDrag({
    item: movedBuilding,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type: 'QueuedBuildingRange',
  });

  const tribe = useRecoilValue(tribeState);
  const classes = useStyles({ isDragging });

  return (
    <QueuedBuildingsDropArea
      getDropPosition={(queueIndex) =>
        queueIndex > rangeFragment.buildings[0].queueIndex
          ? DropPosition.Above
          : DropPosition.Below
      }
      queueIndexBot={rangeFragment.buildings[rangeFragment.buildings.length - 1].queueIndex}
      queueIndexTop={rangeFragment.buildings[0].queueIndex}
    >
      <DragPreviewImage
        connect={preview}
        src={imageLinks.getBuilding(rangeFragment.type, tribe, BuildingImageSize.Small)}
      />
      <div ref={drag} className={classes.root}>
        <QueuedBuildingRangeComponent
          buildingRange={rangeFragment}
          onExpand={onExpand}
        />
      </div>
    </QueuedBuildingsDropArea>
  );
};

QueuedBuildingRange.displayName = 'QueuedBuildingRange';