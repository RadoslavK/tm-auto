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

import type { DroppedQueuedBuildingCanMoveQueuedBuildingToIndexQuery } from '../../../_graphql/__generated__/DroppedQueuedBuildingCanMoveQueuedBuildingToIndexQuery.graphql.js';
import type { QueuedBuildingComponent_queuedBuilding$key } from '../../../_graphql/__generated__/QueuedBuildingComponent_queuedBuilding.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { QueuedBuildingComponent } from './building/QueuedBuildingComponent.js';
import { useDroppedStyles } from './useDroppedStyles.js';

const canMoveQueuedBuildingToIndexQuery = graphql`
    query DroppedQueuedBuildingCanMoveQueuedBuildingToIndexQuery($villageId: ID!, $queueId: ID!, $index: Int!) {
        canMoveQueuedBuildingToIndex(villageId: $villageId, queueId: $queueId, index: $index)
    }
`;

export type MovedQueuedBuilding = {
  readonly queueIndex: number;
  readonly queueId: string;
  readonly buildingFragmentKey: QueuedBuildingComponent_queuedBuilding$key;
};

type Props = {
  readonly index: number;
  readonly movedBuilding: MovedQueuedBuilding;
};

export const DroppedQueuedBuilding: React.FC<Props> = ({
  index,
  movedBuilding,
}) => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const relayEnvironment = useRelayEnvironment();
  const [canBeMoved, setCanBeMoved] = useState<boolean>();

  useEffect(() => {
    fetchQuery<DroppedQueuedBuildingCanMoveQueuedBuildingToIndexQuery>(relayEnvironment, canMoveQueuedBuildingToIndexQuery, {
      villageId,
      queueId: movedBuilding.queueId,
      index,
    }, { fetchPolicy: 'network-only' })
      .subscribe({
        next: ({ canMoveQueuedBuildingToIndex }) => {
          setCanBeMoved(canMoveQueuedBuildingToIndex);
        },
      });
  }, [relayEnvironment, villageId, movedBuilding.queueId, index]);

  const classes = useDroppedStyles({ canBeMoved });

  return (
    <div className={classes.buildingPlaceholder}>
      <QueuedBuildingComponent
        building={movedBuilding.buildingFragmentKey}
        isHighlight
      />
    </div>
  );
};

DroppedQueuedBuilding.displayName = 'DroppedQueuedBuilding';