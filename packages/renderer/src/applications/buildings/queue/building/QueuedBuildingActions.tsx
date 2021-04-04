import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React from 'react';
import { useMutation } from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { QueuedBuildingActionsDequeueBuildingMutation } from '../../../../_graphql/__generated__/QueuedBuildingActionsDequeueBuildingMutation.graphql.js';
import type { QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation } from '../../../../_graphql/__generated__/QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation.graphql.js';
import { selectedVillageIdState } from '../../../../_recoil/atoms/selectedVillageId.js';
import { modificationQueuePayloadUpdater } from '../../../../_shared/cache/modificationQueuePayloadUpdater.js';
import { imageLinks } from '../../../../utils/imageLinks.js';
import { useIsQueuedBuildingExpanded } from '../../hooks/useIsQueuedBuildingExpanded.js';

type Props = {
  readonly buildingQueueId: string;
  readonly className?: string;
  readonly isExpandable: boolean;
  readonly onCollapse?: () => void;
  readonly onExpand?: () => void;
};

const useStyles = makeStyles({
  expand: {
    backgroundImage: `url("${imageLinks.actions.expand}")`,
  },
  collapse: {
    backgroundImage: `url("${imageLinks.actions.collapse}")`,
  },
  delete: {
    backgroundImage: `url("${imageLinks.actions.delete}")`,
  },
  moveToTop: {
    backgroundImage: `url("${imageLinks.actions.queue.moveToTop}")`,
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '2em',
    width: '2em',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const dequeueBuildingMutation = graphql`
  mutation QueuedBuildingActionsDequeueBuildingMutation($input: DequeueBuildingInput!) {
      dequeueBuilding(input: $input) {
         ...ModificationPayload
      }
  }
`;

const moveQueuedBuildingAsHighAsPossibleMutation = graphql`
    mutation QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation($queueId: ID!, $villageId: ID!) {
        moveQueuedBuildingAsHighAsPossible(queueId: $queueId, villageId: $villageId) {
            ...ModificationPayload @arguments(includeOrderChanges: true)
        }
    }
`;

export const QueuedBuildingActions: React.FC<Props> = ({
  buildingQueueId,
  className,
  isExpandable,
  onCollapse,
  onExpand,
}) => {
  const [moveToTop] = useMutation<QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation>(moveQueuedBuildingAsHighAsPossibleMutation);
  const [dequeue] = useMutation<QueuedBuildingActionsDequeueBuildingMutation>(dequeueBuildingMutation);
  const villageId = useRecoilValue(selectedVillageIdState);
  const classes = useStyles({});

  const onMoveToTop = () => {
    moveToTop({
      variables: { queueId: buildingQueueId, villageId },
      updater: (store) => {
        const rootField = store.getRootField('moveQueuedBuildingAsHighAsPossible');
        modificationQueuePayloadUpdater(store, rootField, villageId);
      },
    });
  };

  const onDequeue = () => {
    dequeue({
      variables: { input: { queueId: buildingQueueId, villageId } },
      updater: (store) => {
        const rootField = store.getRootField('dequeueBuilding');
        modificationQueuePayloadUpdater(store, rootField, villageId);
      },
    });
  };

  const isExpanded = useIsQueuedBuildingExpanded(villageId, buildingQueueId);

  return (
    <div className={clsx(className, classes.root)}>
      <button
        className={clsx(classes.image, classes.moveToTop)}
        onClick={onMoveToTop}
      />
      <button
        className={clsx(classes.image, classes.delete)}
        onClick={onDequeue}
      />
      {isExpandable && !isExpanded && onExpand && (
        <button
          className={clsx(classes.image, classes.expand)}
          onClick={onExpand}
        />
      )}
      {isExpandable && isExpanded && onCollapse && (
        <button
          className={clsx(classes.image, classes.collapse)}
          onClick={onCollapse}
        />
      )}
    </div>
  );
};

QueuedBuildingActions.displayName = 'QueuedBuildingActions';
