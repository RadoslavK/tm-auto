import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  fetchQuery,
  useRelayEnvironment,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { DroppedQueuedRangeCanMoveQueuedBuildingsBlockToIndexQuery } from '../../../_graphql/__generated__/DroppedQueuedRangeCanMoveQueuedBuildingsBlockToIndexQuery.graphql.js';
import type { QueuedBuildingRangeComponent_QueuedBuildingRange$key } from '../../../_graphql/__generated__/QueuedBuildingRangeComponent_QueuedBuildingRange.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { QueuedBuildingRangeComponent } from './range/QueuedBuildingRangeComponent.js';
import { useDroppedStyles } from './useDroppedStyles.js';

const canMoveQueuedBuildingsBlockToIndexQuery = graphql`
    query DroppedQueuedRangeCanMoveQueuedBuildingsBlockToIndexQuery($villageId: ID!, $topBuildingQueueId: ID!, $bottomBuildingQueueId: ID!, $index: Int!) {
        canMoveQueuedBuildingsBlockToIndex(villageId: $villageId, topBuildingQueueId: $topBuildingQueueId, bottomBuildingQueueId: $bottomBuildingQueueId, index: $index)
    }
`;

export type MovedQueuedBuildingRange = {
  readonly bottomBuildingQueueId: string;
  readonly topBuildingQueueId: string
  readonly topBuildingQueueIndex: number;
  readonly rangeFragmentKey: QueuedBuildingRangeComponent_QueuedBuildingRange$key;
};

type Props = {
  readonly index: number;
  readonly movedRange: MovedQueuedBuildingRange;
};

export const DroppedQueuedRange: React.FC<Props> = ({
  index,
  movedRange,
}) => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const relayEnvironment = useRelayEnvironment();
  const [canBeMoved, setCanBeMoved] = useState<boolean>();

  useEffect(() => {
    fetchQuery<DroppedQueuedRangeCanMoveQueuedBuildingsBlockToIndexQuery>(relayEnvironment, canMoveQueuedBuildingsBlockToIndexQuery, {
      villageId,
      topBuildingQueueId: movedRange.topBuildingQueueId,
      bottomBuildingQueueId: movedRange.bottomBuildingQueueId,
      index,
    }, { fetchPolicy: 'network-only' })
      .subscribe({
        next: ({ canMoveQueuedBuildingsBlockToIndex }) => {
          setCanBeMoved(canMoveQueuedBuildingsBlockToIndex);
        },
      });
  }, [relayEnvironment, villageId, movedRange.topBuildingQueueId, movedRange.bottomBuildingQueueId, index]);

  const classes = useDroppedStyles({ canBeMoved });

  return (
    <div className={classes.buildingPlaceholder}>
      <QueuedBuildingRangeComponent
        buildingRange={movedRange.rangeFragmentKey}
        isHighlight
      />
    </div>
  );
};

DroppedQueuedRange.displayName = 'DroppedQueuedRange';