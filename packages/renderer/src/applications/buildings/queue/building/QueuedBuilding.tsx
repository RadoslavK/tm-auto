import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  DragPreviewImage,
  useDrag,
} from 'react-dnd';
import {
  useFragment,
  useSubscription,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { QueuedBuilding_queuedBuilding$key } from '../../../../_graphql/__generated__/QueuedBuilding_queuedBuilding.graphql.js';
import type { QueuedBuildingSubscription } from '../../../../_graphql/__generated__/QueuedBuildingSubscription.graphql.js';
import { selectedVillageIdState } from '../../../../_recoil/atoms/selectedVillageId.js';
import { tribeState } from '../../../../_recoil/atoms/tribe.js';
import { modificationQueuePayloadUpdater } from '../../../../_shared/cache/modificationQueuePayloadUpdater.js';
import {
  BuildingImageSize,
  imageLinks,
} from '../../../../utils/imageLinks.js';
import type { MovedQueuedBuilding } from '../DroppedQueuedBuilding.js';
import {
  DropPosition,
  QueuedBuildingsDropArea,
} from '../QueuedBuildingsDropArea.js';
import { QueuedBuildingComponent } from './QueuedBuildingComponent.js';

type StylesProps = {
  readonly isDragging: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: {
    opacity: (props) => (props.isDragging ? 0.5 : 1),
  },
});

type Props = {
  readonly building: QueuedBuilding_queuedBuilding$key;
  readonly index: number;
  readonly onCollapse?: () => void;
  readonly onExpand?: () => void;
};

const queuedBuildingQueuedBuildingFragment = graphql`
  fragment QueuedBuilding_queuedBuilding on QueuedBuilding {
      id
      type
      ...QueuedBuildingComponent_queuedBuilding
  }
`;

const subscription = graphql`
  subscription QueuedBuildingSubscription($villageId: ID!, $id: ID!) {
      queuedBuildingUpdated(villageId: $villageId, id: $id) {
          ...ModificationPayload
      }
  }
`;

export const QueuedBuilding: React.FC<Props> = ({
  building,
  index,
  onCollapse,
  onExpand,
}) => {
  const queuedBuildingFragment = useFragment(queuedBuildingQueuedBuildingFragment, building);
  const villageId = useRecoilValue(selectedVillageIdState);
  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<QueuedBuildingSubscription> => ({
    subscription,
    variables: { villageId, id: queuedBuildingFragment.id },
    updater: (store) => {
      const rootField = store.getRootField('queuedBuildingUpdated');
      modificationQueuePayloadUpdater(store, rootField, villageId);
    },
  }), [villageId, queuedBuildingFragment.id]);

  useSubscription(subscriptionConfig);

  const movedBuilding: MovedQueuedBuilding = {
    buildingFragmentKey: queuedBuildingFragment,
    index,
    queueId: queuedBuildingFragment.id,
  };

  const [{ isDragging }, drag, preview] = useDrag({
    item: movedBuilding,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type: 'QueuedBuilding',
  });

  const classes = useStyles({ isDragging });
  const tribe = useRecoilValue(tribeState);

  return (
    <QueuedBuildingsDropArea
      getDropPosition={(queueIndex) =>
        queueIndex > index
          ? DropPosition.Above
          : DropPosition.Below
      }
      queueId={queuedBuildingFragment.id}
      index={index}
    >
      <DragPreviewImage
        connect={preview}
        src={imageLinks.getBuilding(queuedBuildingFragment.type, tribe, BuildingImageSize.Small)}
      />
      <div ref={drag} className={classes.root}>
        <QueuedBuildingComponent
          building={queuedBuildingFragment}
          onCollapse={onCollapse}
          onExpand={onExpand}
        />
      </div>
    </QueuedBuildingsDropArea>
  );
};

QueuedBuilding.displayName = 'QueuedBuilding';