import {
  Dialog,
  makeStyles,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React, {
  Suspense,
  useState, 
} from 'react';
import {
  useFragment,
  useMutation,
  useQueryLoader,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import { BuildingType } from 'shared/enums/BuildingType.js';

import type { BuildingSpot_buildingSpot$key } from '../../../_graphql/__generated__/BuildingSpot_buildingSpot.graphql.js';
import type { BuildingSpotDequeueBuildingAtFieldMutation } from '../../../_graphql/__generated__/BuildingSpotDequeueBuildingAtFieldMutation.graphql.js';
import type { BuildingSpotEnqueueBuildingMutation } from '../../../_graphql/__generated__/BuildingSpotEnqueueBuildingMutation.graphql.js';
import type { NewBuildingDialogAvailableNewBuildingsTypesQuery } from '../../../_graphql/__generated__/NewBuildingDialogAvailableNewBuildingsTypesQuery.graphql.js';
import { alwaysAddNewToTopState } from '../../../_recoil/atoms/alwaysAddToTop.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { villageTribeState } from '../../../_recoil/atoms/tribe.js';
import { enqueueBuildingUpdater } from '../../../_shared/cache/enqueueBuildingUpdater.js';
import { modificationQueuePayloadUpdater } from '../../../_shared/cache/modificationQueuePayloadUpdater.js';
import { imageLinks } from '../../../utils/imageLinks.js';
import { MultiLevelDialog } from '../multiLevelDialog/MultiLevelDialog.js';
import {
  NewBuildingDialog,
  newBuildingDialogQuery,
} from '../newBuilding/NewBuildingDialog.js';
import { BuildingLevelBox } from './BuildingLevelBox.js';

enum DialogType {
  None,
  MultiDequeue,
  MultiEnqueue,
  NewBuilding,
}

type Props = {
  readonly building: BuildingSpot_buildingSpot$key;
  readonly className?: string;
};

const buildingSpotBuildingSpotFragment = graphql`
    fragment BuildingSpot_buildingSpot on BuildingSpot {
        name
        maxLevel
        type
        fieldId
        level {
            actual
            ongoing
            queued
            total
            state
            ...BuildingLevelBox_buildingSpotLevel
        }
    }
`;

const buildingSpotDequeueBuildingAtFieldMutation = graphql`
    mutation BuildingSpotDequeueBuildingAtFieldMutation($input: DequeueBuildingAtFieldInput!) {
        dequeueBuildingAtField(input: $input) {
            ...ModificationPayload
        }
    }
`;

const buildingSpotEnqueueBuildingMutation = graphql`
    mutation BuildingSpotEnqueueBuildingMutation($input: EnqueueBuildingInput!) {
        enqueueBuilding(input: $input) {
            addedNew
            newIndex
            building {
                ...QueuedBuilding_queuedBuilding
            }
            queue {
                ...BuildingQueueDurationAndCost
            }
        }
    }
`;

type StyleProps = {
  readonly buildingType: number;
  readonly tribe: string;
};

const useStyles = makeStyles<unknown, StyleProps>({
  fieldId: {
    alignSelf: 'center',
    background: '#b1b5b9',
    fontWeight: 'bold',
  },
  root: (props) => ({
    alignItems: 'flex-start',
    justifyContent:
      props.buildingType === BuildingType.None ? 'flex-end' : 'space-between',
    backgroundImage: `url("${imageLinks.getBuilding(props.buildingType, props.tribe)}")`,
    backgroundSize: 'contain',
    border: '1px solid black',
    display: 'flex',
    flexFlow: 'column',
    height: '6rem',
    width: '6rem',
    cursor: 'pointer',
  }),
});

export const BuildingSpot: React.FC<Props> = React.memo(({ building, className }) => {
  const buildingSpotFragment = useFragment(buildingSpotBuildingSpotFragment, building);
  const tribe = useRecoilValue(villageTribeState);
  const classes = useStyles({ buildingType: buildingSpotFragment.type, tribe });
  const [dialog, setDialog] = useState(DialogType.None);
  const villageId = useRecoilValue(selectedVillageIdState);
  const alwaysAddNewToTop = useRecoilValue(alwaysAddNewToTopState);

  const closeDialog = () => setDialog(DialogType.None);

  const [enqueueBuilding] = useMutation<BuildingSpotEnqueueBuildingMutation>(buildingSpotEnqueueBuildingMutation);
  const enqueue = (targetLevel: number | undefined) => {
    enqueueBuilding({
      variables: {
        input: {
          type: buildingSpotFragment.type,
          fieldId: buildingSpotFragment.fieldId,
          villageId,
          targetLevel,
          addNewToTop: alwaysAddNewToTop,
        },
      },
      updater: (store, data) => {
        if (!data.enqueueBuilding) {
          return;
        }

        const result = store.getRootField('enqueueBuilding');
        const addedBuilding = result.getLinkedRecord('building');
        const queue = result.getLinkedRecord('queue');

        enqueueBuildingUpdater(store, addedBuilding, data.enqueueBuilding.addedNew, data.enqueueBuilding.newIndex, queue, villageId);
      },
    });
  };

  const [dequeueAtField] = useMutation<BuildingSpotDequeueBuildingAtFieldMutation>(buildingSpotDequeueBuildingAtFieldMutation);
  const { maxLevel, name, fieldId } = buildingSpotFragment;

  const [loadNewBuildingDialogQueryRef, loadNewBuildingDialogQuery] = useQueryLoader<NewBuildingDialogAvailableNewBuildingsTypesQuery>(newBuildingDialogQuery);

  const reloadNewBuildingDialogQuery = () => {
    loadNewBuildingDialogQuery({ input: { fieldId, villageId } }, { fetchPolicy: 'network-only' });
  };

  const onEnqueue = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (buildingSpotFragment.type !== BuildingType.None) {
      if (buildingSpotFragment.level.state !== 'None'){
        return;
      }

      if (event.ctrlKey && buildingSpotFragment.level.total + 1 < maxLevel) {
        setDialog(DialogType.MultiEnqueue);
      } else {
        enqueue(event.shiftKey ? maxLevel : undefined);
      }
    } else {
      reloadNewBuildingDialogQuery();
      setDialog(DialogType.NewBuilding);
    }
  };

  const onDequeue = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (!buildingSpotFragment.level.queued) {
      return;
    }

    if (event.ctrlKey && ((buildingSpotFragment.level.ongoing ?? buildingSpotFragment.level.actual) + 1 !== buildingSpotFragment.level.queued)) {
      setDialog(DialogType.MultiDequeue);
    } else {
      dequeueAtField({
        variables: {
          input: {
            targetLevel: event.shiftKey
              ? buildingSpotFragment.level.ongoing || buildingSpotFragment.level.actual
              : undefined,
            fieldId: buildingSpotFragment.fieldId,
            villageId,
          },
        },
        updater: (store) => {
          const rootField = store.getRootField('dequeueBuildingAtField');
          modificationQueuePayloadUpdater(store, rootField, villageId);
        },
      });
    }
  };

  const onMultiLevelEnqueue = (targetLevel: number): void => {
    enqueue(targetLevel);
    closeDialog();
  };

  const onMultiLevelDequeue = (targetLevel: number): void => {
    dequeueAtField({
      variables: {
        input: {
          targetLevel,
          fieldId: buildingSpotFragment.fieldId,
          villageId,
        },
      },
      updater: (store) => {
        const rootField = store.getRootField('dequeueBuildingAtField');
        modificationQueuePayloadUpdater(store, rootField, villageId);
      },
    });

    closeDialog();
  };

  return (
    <>
      <div
        className={clsx(className, classes.root)}
        onClick={onEnqueue}
        onContextMenu={onDequeue}
        title={name}>
        {buildingSpotFragment.type !== BuildingType.None && (
          <BuildingLevelBox level={buildingSpotFragment.level} />
        )}
        <div className={classes.fieldId}>[{buildingSpotFragment.fieldId}]</div>
      </div>
      <Dialog onClose={closeDialog} open={dialog === DialogType.NewBuilding}>
        {dialog === DialogType.NewBuilding
        && loadNewBuildingDialogQueryRef
        && (
          <Suspense fallback={null}>
            <NewBuildingDialog
              fieldId={buildingSpotFragment.fieldId}
              onSelect={closeDialog}
              queryRef={loadNewBuildingDialogQueryRef}
            />
          </Suspense>
        )}
      </Dialog>
      <Dialog onClose={closeDialog} open={dialog === DialogType.MultiEnqueue}>
        <MultiLevelDialog
          maxLevel={maxLevel}
          minLevel={buildingSpotFragment.level.total + 1}
          onSelect={onMultiLevelEnqueue}
          itemTitle="Select level"
        />
      </Dialog>
      <Dialog onClose={closeDialog} open={dialog === DialogType.MultiDequeue}>
        {buildingSpotFragment.level.queued && (
          <MultiLevelDialog
            maxLevel={buildingSpotFragment.level.queued - 1}
            minLevel={buildingSpotFragment.level.ongoing || buildingSpotFragment.level.actual}
            onSelect={onMultiLevelDequeue}
            itemTitle="Dequeue to level"
          />
        )}
      </Dialog>
    </>
  );
});

BuildingSpot.displayName = 'BuildingSpot';