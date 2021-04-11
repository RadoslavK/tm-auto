import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
  useSubscription,
} from 'react-relay/hooks';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { VillageQuery } from '../../../_graphql/__generated__/VillageQuery.graphql.js';
import type { VillagesActiveVillageIdChangedSubscription } from '../../../_graphql/__generated__/VillagesActiveVillageIdChangedSubscription.graphql.js';
import type { VillagesQuery } from '../../../_graphql/__generated__/VillagesQuery.graphql.js';
import type { VillagesSubscription } from '../../../_graphql/__generated__/VillagesSubscription.graphql.js';
import type { VillagesVillageSubscription } from '../../../_graphql/__generated__/VillagesVillageSubscription.graphql.js';
import {
  Village,
  villageQuery,
} from './Village.js';
import { VillageSideItem } from './VillageSideItem.js';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  sideMenu: {
    flex: '0 0 300px',
  },
});

export type VillageRouteParams = {
  readonly id: string;
};

graphql`
    fragment Villages_village on Village {
        id
        scanned
        ...VillageSideItem_village
    }
`;

export const villagesQuery = graphql`
    query VillagesQuery {
        villages {
            ...Villages_village @relay (mask: false)
        }
        activeVillageId
    }
`;

const villagesSubscription = graphql`
   subscription VillagesSubscription {
       villagesUpdated {
          ...Villages_village
       }
   }
`;

const activeVillageIdChangedSubscription = graphql`
  subscription VillagesActiveVillageIdChangedSubscription {
      activeVillageIdChanged
  }
`;

const villageSubscription = graphql`
    subscription VillagesVillageSubscription {
        villageUpdated {
            ...Villages_village
            ...Village_village
        }
    }
`;

type Props = {
  readonly queryRef: PreloadedQuery<VillagesQuery>;
};

export const Villages: React.FC<Props> = ({ queryRef }) => {
  const classes = useStyles();

  const { activeVillageId, villages } = usePreloadedQuery(villagesQuery, queryRef);

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<VillagesSubscription> => ({
    subscription: villagesSubscription,
    variables: {},
    updater: (store) => {
      const newRecords = store.getPluralRootField('villagesUpdated');
      store.getRoot().setLinkedRecords(newRecords, 'villages');
    },
  }), []);

  useSubscription(subscriptionConfig);

  const activeVillageIdChangedSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<VillagesActiveVillageIdChangedSubscription> => ({
    subscription: activeVillageIdChangedSubscription,
    variables: {},
    updater: (store, data) => {
      store.getRoot().setValue(data.activeVillageIdChanged, 'activeVillageId');
    },
  }), []);

  useSubscription(activeVillageIdChangedSubscriptionConfig);

  const villageSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<VillagesVillageSubscription> => ({
    subscription: villageSubscription,
    variables: {},
  }), []);

  useSubscription(villageSubscriptionConfig);

  const scannedVillages = useMemo(() => villages.filter(v => v.scanned), [villages]);

  const [villageQueryRef, loadVillageQuery] = useQueryLoader<VillageQuery>(villageQuery);

  return (
    <div className={classes.root}>
      <div className={classes.sideMenu}>
        {villages.map((village) => (
          <VillageSideItem
            key={village.id}
            isVillageActive={village.id === activeVillageId}
            village={village}
            onClick={() => {
              loadVillageQuery({ villageId: village.id }, { fetchPolicy: 'store-and-network' });
            }}
          />
        ))}
      </div>
      <Routes>
        <Route path=":id/*" element={villageQueryRef && <Village queryRef={villageQueryRef} />} />
        {scannedVillages.length > 0 && (
          <Route path="*" element={<Navigate to={scannedVillages[0].id} />} />
        )}
      </Routes>
      {villages.length === 0 && (
        <div>No village was loaded yet</div>
      )}
    </div>
  );
};

Villages.displayName = 'Villages';