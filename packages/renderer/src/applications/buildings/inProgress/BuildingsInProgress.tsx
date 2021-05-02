import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useFragment,
  useSubscription,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { BuildingsInProgress_buildingsInProgress$key } from '../../../_graphql/__generated__/BuildingsInProgress_buildingsInProgress.graphql.js';
import type { BuildingsInProgressSubscription } from '../../../_graphql/__generated__/BuildingsInProgressSubscription.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { BuildingInProgress } from './BuildingInProgress.js';

type Props = {
  readonly buildingsInProgressKey: BuildingsInProgress_buildingsInProgress$key;
  readonly className?: string;
};

const buildingsInProgressFragment = graphql`
  fragment BuildingsInProgress_buildingsInProgress on BuildingInProgress @relay(plural: true) {
      fieldId
      level
      ...BuildingInProgress_buildingInProgress
  }
`;

const buildingsInProgressSubscription = graphql`
    subscription BuildingsInProgressSubscription($villageId: ID!) {
        buildingsInProgressUpdated(villageId: $villageId) {
            ...BuildingInProgress_buildingInProgress
        }
    }
`;

const useStyles = makeStyles({
  header: {
    fontWeight: 700,
  },
});

export const BuildingsInProgress: React.FC<Props> = ({
  buildingsInProgressKey,
  className,
}) => {
  const classes = useStyles();
  const buildingsInProgress = useFragment(buildingsInProgressFragment, buildingsInProgressKey);
  const villageId = useRecoilValue(selectedVillageIdState);
  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingsInProgressSubscription> => ({
    subscription: buildingsInProgressSubscription,
    variables: { villageId },
    updater: (store) => {
      const newRecords = store.getPluralRootField('buildingsInProgressUpdated');
      store.getRoot().setLinkedRecords(newRecords, 'buildingsInProgress', { villageId });
    },
  }), [villageId]);

  useSubscription(subscriptionConfig);

  return (
    <div className={className}>
      <div className={classes.header}>
        Buildings in progress
      </div>
      {buildingsInProgress.map((building) => (
        <BuildingInProgress
          key={`${building.fieldId}|${building.level}`}
          building={building}
        />
      ))}
    </div>
  );
};

BuildingsInProgress.displayName = 'BuildingsInProgress';