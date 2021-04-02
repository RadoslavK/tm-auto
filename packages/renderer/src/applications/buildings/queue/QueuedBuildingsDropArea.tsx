import graphql from 'babel-plugin-relay/macro';
import React, { Suspense } from 'react';
import { useDrop } from 'react-dnd';
import { useMutation } from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutation } from '../../../_graphql/__generated__/QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutation.graphql.js';
import type { QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation } from '../../../_graphql/__generated__/QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import {
  DroppedQueuedBuilding,
  MovedQueuedBuilding,
} from './DroppedQueuedBuilding.js';
import type { MovedQueuedBuildingRange } from './DroppedQueuedRange.js';
import { DroppedQueuedRange } from './DroppedQueuedRange.js';

export enum DropPosition {
  Above = 'Above',
  Below = 'Below',
}

type Props = {
  readonly getDropPosition: (queueIndex: number) => DropPosition;
  readonly queueIndexTop: number;
  readonly queueIndexBot: number;
};

const queuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation = graphql`
  mutation QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation($villageId: ID!, $queueId: ID!, $index: Int!) {
      moveQueuedBuildingToIndex(villageId: $villageId, queueId: $queueId, index: $index)
  }
`;

const queuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutation = graphql`
    mutation QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutation($villageId: ID!, $topBuildingQueueId: ID!, $bottomBuildingQueueId: ID!, $index: Int!) {
        moveQueuedBuildingsBlockToIndex(villageId: $villageId, topBuildingQueueId: $topBuildingQueueId, bottomBuildingQueueId: $bottomBuildingQueueId, index: $index)
    }
`;

export const QueuedBuildingsDropArea: React.FC<Props> = ({
  children,
  getDropPosition,
  queueIndexBot,
  queueIndexTop,
}) => {
  const [moveQueuedBuildingToIndex] = useMutation<QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation>(queuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation);
  const villageId = useRecoilValue(selectedVillageIdState);
  const onDropBuilding = (item: MovedQueuedBuilding) => {
    const targetIndex =
      item.queueIndex < queueIndexTop ? queueIndexBot : queueIndexTop;

    moveQueuedBuildingToIndex({
      variables: {
        villageId,
        queueId: item.queueId,
        index: targetIndex,
      },
    });
  };

  const [{ isBuildingOver, movedBuilding }, dropBuildingRef] = useDrop<
    MovedQueuedBuilding,
    void,
    {
      readonly movedBuilding?: MovedQueuedBuilding;
      readonly isBuildingOver: boolean;
    }
  >({
    accept: 'QueuedBuilding',
    canDrop: (droppedItem) => droppedItem.queueIndex !== queueIndexTop,
    collect: (monitor) => ({
      movedBuilding: monitor.getItem(),
      isBuildingOver: monitor.isOver() && monitor.canDrop(),
    }),
    drop: onDropBuilding,
  });

  const [moveQueuedBuildingsBlockToIndex] = useMutation<QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutation>(queuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutation);

  const onDropRange = (item: MovedQueuedBuildingRange) => {
    const targetIndex =
      item.topBuildingQueueIndex < queueIndexTop
        ? queueIndexBot
        : queueIndexTop;

    moveQueuedBuildingsBlockToIndex({
      variables: {
        villageId,
        index: targetIndex,
        topBuildingQueueId: item.topBuildingQueueId,
        bottomBuildingQueueId:
        item.bottomBuildingQueueId,
      },
    });
  };

  const [{ isRangeOver, movedRange }, dropRangeRef] = useDrop<
    MovedQueuedBuildingRange,
    void,
    {
      readonly movedRange?: MovedQueuedBuildingRange;
      readonly isRangeOver: boolean;
    }
  >({
    accept: 'QueuedBuildingRange',
    canDrop: (droppedItem) =>
      droppedItem.topBuildingQueueIndex !== queueIndexTop,
    collect: (monitor) => ({
      movedRange: monitor.getItem(),
      isRangeOver: monitor.isOver() && monitor.canDrop(),
    }),
    drop: onDropRange,
  });

  const dropPosition =
    (isBuildingOver &&
      movedBuilding &&
      getDropPosition(movedBuilding.queueIndex)) ||
    (isRangeOver &&
      movedRange &&
      getDropPosition(movedRange.topBuildingQueueIndex));

  const indexForRange = (movedRange?.topBuildingQueueIndex ?? 0) < queueIndexTop
    ? queueIndexBot
    : queueIndexTop;

  return (
    <div ref={dropRangeRef}>
      <div ref={dropBuildingRef}>
        {isBuildingOver && dropPosition === DropPosition.Above && movedBuilding && (
          <Suspense fallback={null}>
            <DroppedQueuedBuilding
              index={queueIndexTop}
              movedBuilding={movedBuilding}
            />
          </Suspense>
        )}
        {isRangeOver && dropPosition === DropPosition.Above && movedRange && (
          <Suspense fallback={null}>
            <DroppedQueuedRange
              index={indexForRange}
              movedRange={movedRange}
            />
          </Suspense>
        )}
        {children}
        {isBuildingOver && dropPosition === DropPosition.Below && movedBuilding && (
          <Suspense fallback={null}>
            <DroppedQueuedBuilding
              index={queueIndexTop}
              movedBuilding={movedBuilding}
            />
          </Suspense>
        )}
        {isRangeOver && dropPosition === DropPosition.Below && movedRange && (
          <Suspense fallback={null}>
            <DroppedQueuedRange
              index={indexForRange}
              movedRange={movedRange}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

QueuedBuildingsDropArea.displayName = 'QueuedBuildingsDropArea';