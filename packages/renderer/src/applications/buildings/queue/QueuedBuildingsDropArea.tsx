import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useMutation } from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation } from '../../../_graphql/__generated__/QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { modificationQueuePayloadUpdater } from '../../../_shared/cache/modificationQueuePayloadUpdater.js';
import {
  DroppedQueuedBuilding,
  MovedQueuedBuilding,
} from './DroppedQueuedBuilding.js';

export enum DropPosition {
  Above = 'Above',
  Below = 'Below',
}

type Props = {
  readonly getDropPosition: (queueIndex: number) => DropPosition;
  readonly index: number;
  readonly queueId: string;
};

const queuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation = graphql`
  mutation QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation($villageId: ID!, $queueId: ID!, $targetQueueId: ID!) {
      moveQueuedBuildingToIndex(villageId: $villageId, queueId: $queueId, targetQueueId: $targetQueueId) {
          ...ModificationPayloadWithOrderChanges
      }
  }
`;

export const QueuedBuildingsDropArea: React.FC<Props> = ({
  children,
  getDropPosition,
  index,
  queueId,
}) => {
  const [moveQueuedBuildingToIndex] = useMutation<QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation>(queuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation);
  const villageId = useRecoilValue(selectedVillageIdState);
  const onDropBuilding = (item: MovedQueuedBuilding) => {
    const targetQueueId = queueId;

    moveQueuedBuildingToIndex({
      variables: {
        villageId,
        queueId: item.queueId,
        targetQueueId,
      },
      updater: (store) => {
        const rootField = store.getRootField('moveQueuedBuildingToIndex');
        modificationQueuePayloadUpdater(store, rootField, villageId);
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
    canDrop: (droppedItem) => droppedItem.index !== index,
    collect: (monitor) => ({
      movedBuilding: monitor.getItem(),
      isBuildingOver: monitor.isOver() && monitor.canDrop(),
    }),
    drop: onDropBuilding,
  });

  const dropPosition = isBuildingOver
    && movedBuilding
    && getDropPosition(movedBuilding.index);

  return (
    <div ref={dropBuildingRef}>
      {isBuildingOver && dropPosition === DropPosition.Above && movedBuilding && (
        <DroppedQueuedBuilding movedBuilding={movedBuilding} queueId={queueId} />
      )}
      {children}
      {isBuildingOver && dropPosition === DropPosition.Below && movedBuilding && (
        <DroppedQueuedBuilding movedBuilding={movedBuilding} queueId={queueId} />
      )}
    </div>
  );
};

QueuedBuildingsDropArea.displayName = 'QueuedBuildingsDropArea';