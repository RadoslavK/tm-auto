import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { DragObjectWithType } from 'react-dnd/lib/interfaces';

import {
  QueuedBuilding as QueuedBuildingModel,
  QueuedBuildingRange as QueuedBuildingRangeModel,
  useCanMoveQueuedBuildingsBlockToIndexLazyQuery,
  useCanMoveQueuedBuildingToIndexLazyQuery,
  useMoveQueuedBuildingsBlockToIndexMutation,
  useMoveQueuedBuildingToIndexMutation,
} from '../../../_graphql/graphqlHooks';
import { useVillageContext } from '../../villages/context/villageContext';
import { QueuedBuildingComponent } from './building/QueuedBuildingComponent';
import { QueuedBuildingRangeComponent } from './range/QueuedBuildingRangeComponent';

type MovedQueuedBuilding = DragObjectWithType & {
  readonly building: QueuedBuildingModel;
};

type MovedQueuedBuildingRange = DragObjectWithType & {
  readonly range: QueuedBuildingRangeModel;
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
    backgroundColor: props => props.canBeMoved ? 'green' : 'red',
  },
});

type Props = {
  readonly getDropPosition: (queueIndex: number) => DropPosition;
  readonly queueIndexTop: number;
  readonly queueIndexBot: number;
};

export const QueuedBuildingsDropArea: React.FC<Props> = ({
  children,
  getDropPosition,
  queueIndexBot,
  queueIndexTop,
}) => {
  const { villageId } = useVillageContext();
  const [moveQueuedBuildingToIndex] = useMoveQueuedBuildingToIndexMutation();

  const onDropBuilding = (item: MovedQueuedBuilding) => {
    const targetIndex = item.building.queueIndex < queueIndexTop
      ? queueIndexBot
      : queueIndexTop;

    moveQueuedBuildingToIndex({
      variables: {
        villageId,
        queueId: item.building.queueId,
        index: targetIndex,
      },
    });
  };

  const [{ isBuildingOver, movedBuilding }, dropBuildingRef] = useDrop<MovedQueuedBuilding, void, { readonly movedBuilding: MovedQueuedBuilding, readonly isBuildingOver: boolean }>({
    accept: 'QueuedBuilding',
    canDrop: droppedItem => droppedItem.building.queueIndex !== queueIndexTop,
    collect: (monitor) => ({
      movedBuilding: monitor.getItem(),
      isBuildingOver: monitor.isOver() && monitor.canDrop(),
    }),
    drop: onDropBuilding,
  });

  const [moveQueuedBuildingsBlockToIndex] = useMoveQueuedBuildingsBlockToIndexMutation();

  const onDropRange = (item: MovedQueuedBuildingRange) => {
    const targetIndex = item.range.buildings[0].queueIndex < queueIndexTop
      ? queueIndexBot
      : queueIndexTop;

    moveQueuedBuildingsBlockToIndex({
      variables: {
        villageId,
        index: targetIndex,
        topBuildingQueueId: item.range.buildings[0].queueId,
        bottomBuildingQueueId: item.range.buildings[item.range.buildings.length - 1].queueId,
      },
    });
  };

  const [{ isRangeOver, movedRange }, dropRangeRef] = useDrop<MovedQueuedBuildingRange, void, { readonly movedRange: MovedQueuedBuildingRange, readonly isRangeOver: boolean }>({
    accept: 'QueuedBuildingRange',
    canDrop: droppedItem => droppedItem.range.buildings[0].queueIndex !== queueIndexTop,
    collect: (monitor) => ({
      movedRange: monitor.getItem(),
      isRangeOver: monitor.isOver() && monitor.canDrop(),
    }),
    drop: onDropRange,
  });

  const dropPosition = isBuildingOver && movedBuilding && getDropPosition(movedBuilding.building.queueIndex)
    || isRangeOver && movedRange && getDropPosition(movedRange.range.buildings[0].queueIndex);

  const [fetchMoveBuildingFlag, { data: buildingQueryData, loading: buildingQueryLoading }] = useCanMoveQueuedBuildingToIndexLazyQuery();

  useEffect(() => {
    if (movedBuilding && isBuildingOver) {
      fetchMoveBuildingFlag({
        variables: { villageId, queueId: movedBuilding.building.queueId, index: queueIndexTop },
      });
    }
  }, [movedBuilding, fetchMoveBuildingFlag, villageId, queueIndexTop, isBuildingOver]);

  const [fetchMoveRangeFlag, { data: rangeQueryData, loading: rangeQueryLoading }] = useCanMoveQueuedBuildingsBlockToIndexLazyQuery();

  useEffect(() => {
    if (movedRange && isRangeOver) {
      const targetIndex = movedRange.range.buildings[0].queueIndex < queueIndexTop
        ? queueIndexBot
        : queueIndexTop;

      fetchMoveRangeFlag({
        variables: { villageId, topBuildingQueueId: movedRange.range.buildings[0].queueId, bottomBuildingQueueId: movedRange.range.buildings[movedRange.range.buildings.length - 1].queueId, index: targetIndex },
      });
    }
  }, [movedRange, fetchMoveRangeFlag, villageId, queueIndexTop, queueIndexBot, isRangeOver]);

  const canDroppedBuildingBeMovedHere = isBuildingOver && !buildingQueryLoading && buildingQueryData?.canMoveQueuedBuildingToIndex
    || isRangeOver && !rangeQueryLoading && rangeQueryData?.canMoveQueuedBuildingsBlockToIndex;

  const classes = useStyles({ canBeMoved: !!canDroppedBuildingBeMovedHere });

  return (
    <div ref={dropRangeRef}>
      <div ref={dropBuildingRef}>
        {isBuildingOver && dropPosition === DropPosition.Above && movedBuilding && (
          <div className={classes.buildingPlaceholder}>
            <QueuedBuildingComponent
              building={movedBuilding.building}
              isHighlight
            />
          </div>
        )}
        {isRangeOver && dropPosition === DropPosition.Above && movedRange && (
          <div className={classes.buildingPlaceholder}>
            <QueuedBuildingRangeComponent
              buildingRange={movedRange.range}
              isHighlight
            />
          </div>
        )}
        {children}
        {isBuildingOver && dropPosition === DropPosition.Below && movedBuilding && (
          <div className={classes.buildingPlaceholder}>
            <QueuedBuildingComponent
              building={movedBuilding.building}
              isHighlight
            />
          </div>
        )}
        {isRangeOver && dropPosition === DropPosition.Below && movedRange && (
          <div className={classes.buildingPlaceholder}>
            <QueuedBuildingRangeComponent
              buildingRange={movedRange.range}
              isHighlight
            />
          </div>
        )}
      </div>
    </div>
  );
};