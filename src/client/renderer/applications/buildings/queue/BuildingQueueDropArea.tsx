import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { DragObjectWithType } from 'react-dnd/lib/interfaces';

import {
  QueuedBuilding as QueuedBuildingModel,
  useCanMoveQueuedBuildingToIndexLazyQuery,
  useMoveQueuedBuildingToIndexMutation,
} from '../../../_graphql/graphqlHooks';
import { useVillageContext } from '../../villages/context/villageContext';
import { QueuedBuildingComponent } from './QueuedBuildingComponent';

type MovedBuilding = DragObjectWithType & {
  readonly queueId: string;
  readonly queueIndex: number;
  readonly buildingType: number;
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
  readonly getBuilding: (movedBuildingIndex: number) => QueuedBuildingModel;
  readonly queueIndex: number;
  readonly getDropPosition: (queueIndex: number) => DropPosition;
};

export const BuildingQueueDropArea: React.FC<Props> = ({ children, getBuilding, getDropPosition, queueIndex }) => {
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

  const classes = useStyles({ canBeMoved: !!canDroppedBuildingBeMovedHere });

  return (
    <div ref={drop}>
      {isOver && dropPosition === DropPosition.Above && movedBuilding && (
        <div className={classes.buildingPlaceholder}>
          <QueuedBuildingComponent building={getBuilding(movedBuilding.queueIndex)} />
        </div>
      )}
      {children}
      {isOver && dropPosition === DropPosition.Below && movedBuilding && (
        <div className={classes.buildingPlaceholder}>
          <QueuedBuildingComponent building={getBuilding(movedBuilding.queueIndex)} />
        </div>
      )}
    </div>
  );
};