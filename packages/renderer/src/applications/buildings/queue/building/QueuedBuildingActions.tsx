import {
  Dialog,
  makeStyles,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React, { useState } from 'react';
import {
  useFragment,
  useMutation,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { QueuedBuildingActions_queuedBuilding$key } from '../../../../_graphql/__generated__/QueuedBuildingActions_queuedBuilding.graphql.js';
import type { QueuedBuildingActionsDequeueBuildingMutation } from '../../../../_graphql/__generated__/QueuedBuildingActionsDequeueBuildingMutation.graphql.js';
import type { QueuedBuildingActionsMergeBuildingsMutation } from '../../../../_graphql/__generated__/QueuedBuildingActionsMergeBuildingsMutation.graphql.js';
import type { QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation } from '../../../../_graphql/__generated__/QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation.graphql.js';
import type { QueuedBuildingActionsSplitBuildingMutation } from '../../../../_graphql/__generated__/QueuedBuildingActionsSplitBuildingMutation.graphql.js';
import { selectedVillageIdState } from '../../../../_recoil/atoms/selectedVillageId.js';
import { modificationQueuePayloadUpdater } from '../../../../_shared/cache/modificationQueuePayloadUpdater.js';
import { imageLinks } from '../../../../utils/imageLinks.js';
import { MultiLevelDialog } from '../../multiLevelDialog/MultiLevelDialog.js';

const buildingFragmentDefinition = graphql`
  fragment QueuedBuildingActions_queuedBuilding on QueuedBuilding {
      id
      startingLevel
      targetLevel
  }
`;

type Props = {
  readonly building: QueuedBuildingActions_queuedBuilding$key;
  readonly className?: string;
  readonly isMergeable: boolean;
};

const useStyles = makeStyles({
  split: {
    backgroundImage: `url("${imageLinks.actions.split}")`,
  },
  merge: {
    backgroundImage: `url("${imageLinks.actions.merge}")`,
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
            ...ModificationPayloadWithOrderChanges
        }
    }
`;

const splitBuildingMutation = graphql`
  mutation QueuedBuildingActionsSplitBuildingMutation($villageId: ID!, $queueId: ID!, $startingLevel: Int!) {
      splitQueuedBuilding(villageId: $villageId, queueId: $queueId, startingLevel: $startingLevel) {
          addedBuilding {
              ...QueuedBuilding_queuedBuilding
          }
          updatedBuilding {
              ...QueuedBuilding_queuedBuilding
          }
      }
  }
`;

const mergeBuildingsMutation = graphql`
    mutation QueuedBuildingActionsMergeBuildingsMutation($villageId: ID!, $topQueueId: ID!) {
        mergeQueuedBuildings(villageId: $villageId, topQueueId: $topQueueId) {
            removedBuilding {
                id
            }
            updatedBuilding {
                ...QueuedBuilding_queuedBuilding
            }
        }
    }
`;

enum DialogType {
  None,
  Split,
  Dequeue,
}

export const QueuedBuildingActions: React.FC<Props> = ({
  building,
  className,
  isMergeable,
}) => {
  const buildingFragment = useFragment(buildingFragmentDefinition, building);
  const villageId = useRecoilValue(selectedVillageIdState);
  const classes = useStyles({});

  const [moveToTop] = useMutation<QueuedBuildingActionsMoveQueuedBuildingAsHighAsPossibleMutation>(moveQueuedBuildingAsHighAsPossibleMutation);
  const [dequeue] = useMutation<QueuedBuildingActionsDequeueBuildingMutation>(dequeueBuildingMutation);
  const [split] = useMutation<QueuedBuildingActionsSplitBuildingMutation>(splitBuildingMutation);
  const [merge] = useMutation<QueuedBuildingActionsMergeBuildingsMutation>(mergeBuildingsMutation);

  const [dialog, setDialog] = useState<DialogType>(DialogType.None);
  const closeDialog = () => setDialog(DialogType.None);

  const onMoveToTop = () => {
    moveToTop({
      variables: { queueId: buildingFragment.id, villageId },
      updater: (store) => {
        const rootField = store.getRootField('moveQueuedBuildingAsHighAsPossible');
        modificationQueuePayloadUpdater(store, rootField, villageId);
      },
    });
  };

  const dequeueBuilding = (level?: number) => {
    dequeue({
      variables: { input: { queueId: buildingFragment.id, villageId, level } },
      updater: (store) => {
        const rootField = store.getRootField('dequeueBuilding');
        modificationQueuePayloadUpdater(store, rootField, villageId);
      },
    });
  };

  const splitBuilding = (startingLevel: number) => {
    closeDialog();

    split({
      variables: { villageId, queueId: buildingFragment.id, startingLevel },
      updater: (store) => {
        const result = store.getRootField('splitQueuedBuilding');
        const newRecord = result.getLinkedRecord('addedBuilding');
        const updatedRecord = result.getLinkedRecord('updatedBuilding');

        const root = store.getRoot();
        const queue = root.getLinkedRecord('buildingQueue', { villageId });

        if (!queue) {
          return;
        }

        const buildings = queue.getLinkedRecords('buildings') || [];
        const updatedRecordIndex = buildings.findIndex(b => b.getDataID() === updatedRecord.getDataID());

        buildings.splice(updatedRecordIndex + 1, 0, newRecord);
        queue.setLinkedRecords(buildings, 'buildings');
        root.setLinkedRecord(queue, 'buildingQueue', { villageId });
      },
    });
  };

  const mergeBuildings = () => {
    merge({
      variables: { villageId, topQueueId: buildingFragment.id },
      updater: (store) => {
        const root = store.getRoot();
        const removedRecord = store.getRootField('mergeQueuedBuildings').getLinkedRecord('removedBuilding');
        const queue = root.getLinkedRecord('buildingQueue', { villageId });

        if (!queue) {
          return;
        }

        let buildings = queue.getLinkedRecords('buildings') || [];
        buildings = buildings?.filter(b => b.getDataID() !== removedRecord.getDataID());

        queue.setLinkedRecords(buildings, 'buildings');
        root.setLinkedRecord(queue, 'buildingQueue', { villageId });
      },
    });
  };

  const isSplittable = buildingFragment.startingLevel !== buildingFragment.targetLevel;

  const onSplit = () => {
    if (buildingFragment.startingLevel + 1 === buildingFragment.targetLevel) {
      splitBuilding(buildingFragment.targetLevel);
    } else {
      setDialog(DialogType.Split);
    }
  };

  const onDequeue = (e: React.MouseEvent) => {
    if (e.ctrlKey && buildingFragment.startingLevel !== buildingFragment.targetLevel) {
      if (buildingFragment.startingLevel + 1 === buildingFragment.targetLevel) {
        dequeueBuilding(buildingFragment.targetLevel);
      } else {
        setDialog(DialogType.Dequeue);
      }
    } else {
      dequeueBuilding();
    }
  };

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
      {isSplittable && (
        <>
          <button
            className={clsx(classes.image, classes.split)}
            onClick={onSplit}
          />
          <Dialog open={dialog === DialogType.Split} onClose={closeDialog}>
            <MultiLevelDialog
              minLevel={buildingFragment.startingLevel + 1}
              maxLevel={buildingFragment.targetLevel}
              onSelect={splitBuilding}
            />
          </Dialog>
          <Dialog open={dialog === DialogType.Dequeue} onClose={closeDialog}>
            <MultiLevelDialog
              minLevel={buildingFragment.startingLevel}
              maxLevel={buildingFragment.targetLevel - 1}
              onSelect={(level) => {
                closeDialog();
                return dequeueBuilding(level + 1);
              }}
            />
          </Dialog>
        </>
      )}
      {isMergeable && (
        <button
          className={clsx(classes.image, classes.merge)}
          onClick={mergeBuildings}
        />
      )}
    </div>
  );
};

QueuedBuildingActions.displayName = 'QueuedBuildingActions';
