import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useDrop } from 'react-dnd';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';

import type { QueuedBuildingComponent_queuedBuilding$key } from '../../../_graphql/__generated__/QueuedBuildingComponent_queuedBuilding.graphql.js';
import type { QueuedBuildingRangeComponent_QueuedBuildingRange$key } from '../../../_graphql/__generated__/QueuedBuildingRangeComponent_QueuedBuildingRange.graphql.js';
import type { QueuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQuery } from '../../../_graphql/__generated__/QueuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQuery.graphql.js';
import type { QueuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQuery } from '../../../_graphql/__generated__/QueuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQuery.graphql.js';
import type { QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutation } from '../../../_graphql/__generated__/QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutation.graphql.js';
import type { QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation } from '../../../_graphql/__generated__/QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation.graphql.js';
import { QueuedBuildingComponent } from './building/QueuedBuildingComponent.js';
import { QueuedBuildingRangeComponent } from './range/QueuedBuildingRangeComponent.js';

export type MovedQueuedBuilding = {
  readonly queueIndex: number;
  readonly queueId: string;
  readonly buildingFragmentKey: QueuedBuildingComponent_queuedBuilding$key;
};

export type MovedQueuedBuildingRange = {
  readonly bottomBuildingQueueId: string;
  readonly topBuildingQueueId: string
  readonly topBuildingQueueIndex: number;
  readonly rangeFragmentKey: QueuedBuildingRangeComponent_QueuedBuildingRange$key;
};

export enum DropPosition {
  Above = 'Above',
  Below = 'Below',
}

type StylesProps = {
  readonly canBeMoved: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  buildingPlaceholder: {
    backgroundColor: (props) => (props.canBeMoved ? 'green' : 'red'),
  },
});

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

const queuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQuery = graphql`
  query QueuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQuery($villageId: ID!, $queueId: ID!, $index: Int!, $skip: Boolean!) {
      canMoveQueuedBuildingToIndex(villageId: $villageId, queueId: $queueId, index: $index) @skip(if: $skip)
  }
`;

const queuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQuery = graphql`
    query QueuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQuery($villageId: ID!, $topBuildingQueueId: ID!, $bottomBuildingQueueId: ID!, $index: Int!, $skip: Boolean!) {
        canMoveQueuedBuildingsBlockToIndex(villageId: $villageId, topBuildingQueueId: $topBuildingQueueId, bottomBuildingQueueId: $bottomBuildingQueueId, index: $index) @skip(if: $skip)
    }
`;

export const QueuedBuildingsDropArea: React.FC<Props> = ({
  children,
  getDropPosition,
  queueIndexBot,
  queueIndexTop,
}) => {
  const villageId = '';
  const [moveQueuedBuildingToIndex] = useMutation<QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation>(queuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation);

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
      readonly movedBuilding: MovedQueuedBuilding;
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
      readonly movedRange: MovedQueuedBuildingRange;
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

  const { canMoveQueuedBuildingToIndex } = useLazyLoadQuery<QueuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQuery>(queuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQuery, {
    villageId,
    queueId: movedBuilding.queueId,
    index: queueIndexTop,
    skip: !movedBuilding || !isBuildingOver,
  });

  const { canMoveQueuedBuildingsBlockToIndex } = useLazyLoadQuery<QueuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQuery>(queuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQuery, {
    villageId,
    topBuildingQueueId: movedRange.topBuildingQueueId,
    bottomBuildingQueueId:
    movedRange.bottomBuildingQueueId,
    index: movedRange.topBuildingQueueIndex < queueIndexTop
      ? queueIndexBot
      : queueIndexTop,
    skip: !movedRange || !isRangeOver,
  });

  const canDroppedBuildingBeMovedHere =
    (isBuildingOver && !!canMoveQueuedBuildingToIndex)
    || (isRangeOver && !!canMoveQueuedBuildingsBlockToIndex);

  const classes = useStyles({ canBeMoved: canDroppedBuildingBeMovedHere });

  return (
    <div ref={dropRangeRef}>
      <div ref={dropBuildingRef}>
        {isBuildingOver && dropPosition === DropPosition.Above && movedBuilding && (
          <div className={classes.buildingPlaceholder}>
            <QueuedBuildingComponent
              building={movedBuilding.buildingFragmentKey}
              isHighlight
            />
          </div>
        )}
        {isRangeOver && dropPosition === DropPosition.Above && movedRange && (
          <div className={classes.buildingPlaceholder}>
            <QueuedBuildingRangeComponent
              buildingRange={movedRange.rangeFragmentKey}
              isHighlight
            />
          </div>
        )}
        {children}
        {isBuildingOver && dropPosition === DropPosition.Below && movedBuilding && (
          <div className={classes.buildingPlaceholder}>
            <QueuedBuildingComponent
              building={movedBuilding.buildingFragmentKey}
              isHighlight
            />
          </div>
        )}
        {isRangeOver && dropPosition === DropPosition.Below && movedRange && (
          <div className={classes.buildingPlaceholder}>
            <QueuedBuildingRangeComponent
              buildingRange={movedRange.rangeFragmentKey}
              isHighlight
            />
          </div>
        )}
      </div>
    </div>
  );
};
