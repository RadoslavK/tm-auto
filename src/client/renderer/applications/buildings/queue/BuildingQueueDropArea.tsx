import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { DragObjectWithType } from 'react-dnd/lib/interfaces';

import {
  useCanMoveQueuedBuildingToIndexLazyQuery,
  useMoveQueuedBuildingToIndexMutation,
} from '../../../_graphql/graphqlHooks';
import { useVillageContext } from '../../villages/context/villageContext';

export type MovedBuilding = DragObjectWithType & {
  readonly queueId: string;
  readonly queueIndex: number;
  readonly buildingType: number;
};

export enum DropPosition {
  Above = 'Above',
  Below = 'Below',
}

type Props = {
  readonly queueIndex: number;
  readonly getDropPosition: (queueIndex: number) => DropPosition;
};

export const BuildingQueueDropArea: React.FC<Props> = ({ children, getDropPosition, queueIndex }) => {
  const { villageId } = useVillageContext();
  const [moveQueuedBuildingToIndex] = useMoveQueuedBuildingToIndexMutation();

  const onDrop = (item: MovedBuilding) => {
    moveQueuedBuildingToIndex({
      variables: {
        villageId,
        queueId: item.queueId,
        index: queueIndex,
      },
    });
  };

  const [{ isOver, movedBuilding }, drop] = useDrop<MovedBuilding, void, { readonly movedBuilding: MovedBuilding, readonly isOver: boolean }>({
    accept: 'QueuedBuilding',
    canDrop: droppedItem => droppedItem.queueIndex !== queueIndex,
    collect: (monitor) => ({
      movedBuilding: monitor.getItem(),
      isOver: monitor.isOver() && monitor.canDrop(),
    }),
    drop: onDrop,
  });

  const dropPosition = movedBuilding && getDropPosition(movedBuilding.queueIndex);

  const [fetchMoveFlag, { data: queryData, loading: queryLoading }] = useCanMoveQueuedBuildingToIndexLazyQuery();

  useEffect(() => {
    if (movedBuilding && isOver) {
      fetchMoveFlag({
        variables: { villageId, queueId: movedBuilding.queueId, index: queueIndex },
      });
    }
  }, [movedBuilding, fetchMoveFlag, villageId, queueIndex, isOver]);

  const canDroppedBuildingBeMovedHere = !queryLoading && queryData?.canMoveBuildingToIndex;

  return (
    <div ref={drop}>
      <span style={{ backgroundColor: canDroppedBuildingBeMovedHere ? 'green' : 'red' }}>
        {isOver && dropPosition === DropPosition.Above && 'IS OVER!!'}
      </span>
      {children}
      <span style={{ backgroundColor: canDroppedBuildingBeMovedHere ? 'green' : 'red' }}>
        {isOver && dropPosition === DropPosition.Below && 'IS OVER!!'}
      </span>
    </div>
  );
};