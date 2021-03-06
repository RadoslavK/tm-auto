import {
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  makeStyles,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  Suspense,
  useMemo,
  useState,
} from 'react';
import {
  useFragment,
  useMutation,
  useQueryLoader,
  useSubscription,
} from 'react-relay/hooks';
import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { BuildingQueue_autoBuildSettings$key } from '../../../_graphql/__generated__/BuildingQueue_autoBuildSettings.graphql.js';
import type { BuildingQueue_buildingQueue$key } from '../../../_graphql/__generated__/BuildingQueue_buildingQueue.graphql.js';
import type { BuildingQueueAddBuildingMutation } from '../../../_graphql/__generated__/BuildingQueueAddBuildingMutation.graphql.js';
import type { DemolitionBuildingInput } from '../../../_graphql/__generated__/BuildingQueueAddBuildingMutation.graphql.js';
import type { BuildingQueueAutoBuildSettingsSubscription } from '../../../_graphql/__generated__/BuildingQueueAutoBuildSettingsSubscription.graphql.js';
import type { BuildingQueueClearQueueMutation } from '../../../_graphql/__generated__/BuildingQueueClearQueueMutation.graphql.js';
import type { BuildingQueueCorrectionSubscription } from '../../../_graphql/__generated__/BuildingQueueCorrectionSubscription.graphql.js';
import type { BuildingQueueQueuedBuildingSubscription } from '../../../_graphql/__generated__/BuildingQueueQueuedBuildingSubscription.graphql.js';
import type { BuildingQueueTimesUpdatedSubscription } from '../../../_graphql/__generated__/BuildingQueueTimesUpdatedSubscription.graphql.js';
import type { BuildingsDemolitionDialogQuery } from '../../../_graphql/__generated__/BuildingsDemolitionDialogQuery.graphql.js';
import { alwaysAddNewToTopState } from '../../../_recoil/atoms/alwaysAddToTop.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { villageTribeState } from '../../../_recoil/atoms/tribe.js';
import { modificationQueuePayloadUpdater } from '../../../_shared/cache/modificationQueuePayloadUpdater.js';
import {
  BuildingsDemolitionDialog,
  buildingsDemolitionDialogQuery,
} from '../demolition/BuildingsDemolitionDialog.js';
import { QueuedBuilding } from './building/QueuedBuilding.js';
import { Cost } from './Cost.js';

type Props = {
  readonly autoBuildSettingsKey: BuildingQueue_autoBuildSettings$key;
  readonly buildingQueueKey: BuildingQueue_buildingQueue$key;
  readonly className?: string;
};

const useStyles = makeStyles({
  header: {
    display: 'flex',
    marginBottom: 12,
    borderBottom: 'dimgrey solid 3px',
    '& > *': {
      flex: 1,
    },
  },
  action: {
    marginBottom: '15px',
    width: '100%',
    flex: 1,
    '&:not(:last-child)': {
      marginRight: 16,
    },
  },
  buildings: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '80vh',
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
});

const buildingQueueFragment = graphql`
  fragment BuildingQueue_buildingQueue on BuildingQueue {
      buildings {
          id
          fieldId
          ...QueuedBuilding_queuedBuilding
      }
      totalCost {
          ...Cost_resources
      }
      totalBuildingTime {
          ...Cost_duration
      }
      infrastructureBuildingTime {
          ...Cost_duration
      }
      resourcesBuildingTime {
          ...Cost_duration
      }
  }
`;

const autoBuildSettingsFragmentDef = graphql`
    fragment BuildingQueue_autoBuildSettings on AutoBuildSettings {
        dualQueue {
            allow
        }   
    }
`;

const buildingQueueClearQueueMutation = graphql`
  mutation BuildingQueueClearQueueMutation($villageId: ID!) {
      clearQueue(villageId: $villageId) {
          ...BuildingQueue_buildingQueue
      }
  }
`;

const correctionSubscription = graphql`
  subscription BuildingQueueCorrectionSubscription($villageId: ID!) {
      buildingQueueCorrected(villageId: $villageId) {
          ...ModificationPayload
      }
  }
`;

const timesUpdatedSubscription = graphql`
  subscription BuildingQueueTimesUpdatedSubscription($villageId: ID!) {
      buildingQueueTimesUpdated(villageId: $villageId) {
        ...BuildingQueueTimes   
      }
  }
`;

const queuedBuildingSubscription = graphql`
    subscription BuildingQueueQueuedBuildingSubscription($villageId: ID!) {
        queuedBuildingUpdated(villageId: $villageId) {
            ...ModificationPayload
        }
    }
`;

const autoBuildSettingsSubscription = graphql`
  subscription BuildingQueueAutoBuildSettingsSubscription($villageId: ID!) {
      autoBuildSettingsUpdated(villageId: $villageId) {
          ...BuildingQueue_autoBuildSettings
      }
  }
`;

const addDemolitionBuildingMutation = graphql`
    mutation BuildingQueueAddBuildingMutation($villageId: ID!, $building: DemolitionBuildingInput!) {
        addDemolitionBuilding(villageId: $villageId, building: $building) {
            ...BuildingsDemolitionDialog_buildingDemolitionSettings
        }
    }
`;

export const BuildingQueue: React.FC<Props> = ({
  autoBuildSettingsKey,
  buildingQueueKey,
  className,
}) => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const autoBuildSettings = useFragment(autoBuildSettingsFragmentDef, autoBuildSettingsKey);
  const tribe = useRecoilValue(villageTribeState);
  const shouldSplitBuildingTimes = tribe === 'Romans' && autoBuildSettings.dualQueue.allow;

  const buildingQueue = useFragment(buildingQueueFragment, buildingQueueKey);

  const classes = useStyles();

  const [clearQueue] = useMutation<BuildingQueueClearQueueMutation>(buildingQueueClearQueueMutation);

  const correctionSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingQueueCorrectionSubscription> => ({
    subscription: correctionSubscription,
    variables: { villageId },
    updater: (store) => {
      const rootField = store.getRootField('buildingQueueCorrected');
      modificationQueuePayloadUpdater(store, rootField, villageId);
    },
  }), [villageId]);

  useSubscription(correctionSubscriptionConfig);

  const timesUpdatedSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingQueueTimesUpdatedSubscription> => ({
    subscription: timesUpdatedSubscription,
    variables: { villageId },
    updater: (store) => {
      const root = store.getRoot();
      const queue = root.getLinkedRecord('buildingQueue', { villageId });

      if (!queue) {
        return;
      }

      const updatedTimes = store.getRootField('buildingQueueTimesUpdated');

      queue.copyFieldsFrom(updatedTimes);
      root.setLinkedRecord(queue, 'buildingQueue', { villageId });
    },
  }), [villageId]);

  useSubscription(timesUpdatedSubscriptionConfig);

  const queuedBuildingSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingQueueQueuedBuildingSubscription> => ({
    subscription: queuedBuildingSubscription,
    variables: { villageId },
    updater: (store) => {
      const rootField = store.getRootField('queuedBuildingUpdated');
      modificationQueuePayloadUpdater(store, rootField, villageId);
    },
  }), [villageId]);

  useSubscription(queuedBuildingSubscriptionConfig);

  const autoBuildSettingsSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingQueueAutoBuildSettingsSubscription> => ({
    subscription: autoBuildSettingsSubscription,
    variables: { villageId },
    updater: (store) => {
      const newRecord = store.getRootField('autoBuildSettingsUpdated');
      store.getRoot().setLinkedRecord(newRecord, 'autoBuildSettings', { villageId });
    },
  }), [villageId]);

  useSubscription(autoBuildSettingsSubscriptionConfig);

  const onClear = (): void => {
    clearQueue({
      variables: { villageId },
      updater: (store) => {
        const newRecord = store.getRootField('clearQueue');
        store.getRoot().setLinkedRecord(newRecord, 'buildingQueue', { villageId });
      },
    });
  };

  const [alwaysAddNewToTop, setAlwaysAddNewToTop] = useRecoilState(alwaysAddNewToTopState);

  const [isDemolitionDialogOpen, setIsDemolitionDialogOpen] = useState(false);
  const openDemolitionDialog = () => {
    loadBuildingsDemolitionDialogQuery({ villageId }, { fetchPolicy: 'store-and-network' });
    setIsDemolitionDialogOpen(true);
  };
  const closeDemolitionDialog = () => setIsDemolitionDialogOpen(false);

  const [buildingsDemolitionDialogQueryRef, loadBuildingsDemolitionDialogQuery] = useQueryLoader<BuildingsDemolitionDialogQuery>(buildingsDemolitionDialogQuery);

  const [addDemolitionBuilding] = useMutation<BuildingQueueAddBuildingMutation>(addDemolitionBuildingMutation);

  const addDemolitionBuildingToList = (building: DemolitionBuildingInput) => {
    addDemolitionBuilding({
      variables: { villageId, building },
      updater: (store) => {
        const newRecord = store.getRootField('addDemolitionBuilding');
        const root = store.getRoot();
        const settings = root.getLinkedRecord('autoBuildSettings', { villageId });

        if (!settings) {
          return;
        }

        const buildings = settings.getLinkedRecords('buildingsDemolition') || [];

        buildings.push(newRecord);
        settings.setLinkedRecords(buildings, 'buildingsDemolition');
        root.setLinkedRecord(settings, 'autoBuildSettings', { villageId });
      },
    });
  };

  return (
    <div className={className}>
      <div className={classes.header}>
        <FormControlLabel
          label="Always add new to top"
          control={(
            <Checkbox
              checked={alwaysAddNewToTop}
              onChange={e => setAlwaysAddNewToTop(e.currentTarget.checked)}
            />
          )}
        />
        <Button
          className={classes.action}
          onClick={openDemolitionDialog}
          color="default"
          variant="contained"
        >
          Demolish
        </Button>
        <Button
          className={classes.action}
          onClick={onClear}
          color="secondary"
          variant="contained"
        >
          Clear queue
        </Button>
        <Dialog
          open={isDemolitionDialogOpen}
          onClose={closeDemolitionDialog}
        >
          <Suspense fallback={null}>
            {buildingsDemolitionDialogQueryRef && (
              <BuildingsDemolitionDialog
                onSubmit={addDemolitionBuildingToList}
                queryRef={buildingsDemolitionDialogQueryRef}
              />
            )}
          </Suspense>
        </Dialog>
      </div>
      <Cost
        buildTime={buildingQueue.totalBuildingTime}
        infrastructureBuildTime={buildingQueue.infrastructureBuildingTime}
        resourcesBuildTime={buildingQueue.resourcesBuildingTime}
        split={shouldSplitBuildingTimes}
        resources={buildingQueue.totalCost}
      />
      <div className={classes.buildings}>
        {buildingQueue.buildings.map((building, index) => {
          const nextBuilding = buildingQueue.buildings[index + 1];
          const isMergeable = !!nextBuilding && nextBuilding.fieldId === building.fieldId;

          return (
            <QueuedBuilding
              key={building.id}
              building={building}
              index={index}
              isMergeable={isMergeable}
            />
          );
        })}
      </div>
    </div>
  );
};

BuildingQueue.displayName = 'BuildingQueue';