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

import type { DroppedQueuedBuildingCanMoveQueuedBuildingQuery } from '../../../_graphql/__generated__/DroppedQueuedBuildingCanMoveQueuedBuildingQuery.graphql.js';
import type { QueuedBuildingComponent_queuedBuilding$key } from '../../../_graphql/__generated__/QueuedBuildingComponent_queuedBuilding.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { QueuedBuildingComponent } from './building/QueuedBuildingComponent.js';
import { useDroppedStyles } from './useDroppedStyles.js';

const canMoveQueuedBuilding = graphql`
    query DroppedQueuedBuildingCanMoveQueuedBuildingQuery($villageId: ID!, $queueId: ID!, $targetQueueId: ID!) {
        canMoveQueuedBuilding(villageId: $villageId, queueId: $queueId, targetQueueId: $targetQueueId)
    }
`;

export type MovedQueuedBuilding = {
  readonly buildingFragmentKey: QueuedBuildingComponent_queuedBuilding$key;
  readonly index: number;
  readonly queueId: string;
};

type Props = {
  readonly movedBuilding: MovedQueuedBuilding;
  readonly queueId: string;
};

export const DroppedQueuedBuilding: React.FC<Props> = ({
  movedBuilding,
  queueId,
}) => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const relayEnvironment = useRelayEnvironment();
  const [canBeMoved, setCanBeMoved] = useState<boolean>();

  useEffect(() => {
    fetchQuery<DroppedQueuedBuildingCanMoveQueuedBuildingQuery>(relayEnvironment, canMoveQueuedBuilding, {
      villageId,
      queueId: movedBuilding.queueId,
      targetQueueId: queueId,
    }, { fetchPolicy: 'network-only' })
      .subscribe({
        next: ({ canMoveQueuedBuilding }) => {
          setCanBeMoved(canMoveQueuedBuilding);
        },
      });
  }, [relayEnvironment, villageId, movedBuilding.queueId, queueId]);

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