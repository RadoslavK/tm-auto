import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useLazyLoadQuery,
  useSubscription,
} from 'react-relay/hooks';
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import type {
  GraphQLSubscriptionConfig,
  RecordProxy,
} from 'relay-runtime';
import { nameOf } from 'shared/utils/nameOf.js';

import type {
  VillagesQuery,
  VillagesQueryResponse,
} from '../../../_graphql/__generated__/VillagesQuery.graphql.js';
import type { VillagesSubscription } from '../../../_graphql/__generated__/VillagesSubscription.graphql.js';
import { Village } from './Village.js';
import { VillageSideItem } from './VillageSideItem.js';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  sideMenu: {
    flex: '0 0 300px',
  },
});

type VillageRouteParams = {
  readonly id: string;
};

const villagesQuery = graphql`
    query VillagesQuery {
        villages {
            id
            ...VillageSideItem_village
        }
        activeVillageId
    }
`;

const villagesSubscription = graphql`
   subscription VillagesSubscription {
       villagesUpdated {
           id
           ...VillageSideItem_village
       }
       activeVillageIdChanged
   }
`;

export const Villages: React.FC = () => {
  const classes = useStyles();
  const match = useRouteMatch();

  const { activeVillageId, villages } = useLazyLoadQuery<VillagesQuery>(villagesQuery, {});

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<VillagesSubscription> => ({
    subscription: villagesSubscription,
    variables: {},
    updater: (store, data) => {
      const root = store.getRoot();

      root.setValue(data.activeVillageIdChanged, nameOf<VillagesQueryResponse>('activeVillageId'));

      const villagesRecords = data.villagesUpdated.reduce(
        (records, village) => {
          const record = store.get(village.id);

          return record ? [...records, record] : records;
        },
        [] as RecordProxy[],
      );
      root.setLinkedRecords(villagesRecords, nameOf<VillagesQueryResponse>('villages'));
    },
  }), []);

  useSubscription(subscriptionConfig);

  return (
    <div className={classes.root}>
      <div className={classes.sideMenu}>
        <Route
          path={`${match.path}/:id`}
          render={props => {
            const { id } = (props.match.params as VillageRouteParams);

            return (
              <>
                {villages.map((village) => (
                  <VillageSideItem
                    key={village.id}
                    isVillageActive={village.id === activeVillageId}
                    isVillageSelected={village.id === id}
                    village={village}
                  />
                ))}
              </>
            );
          }}
        />
      </div>
      <Switch>
        <Route
          path={`${match.path}/:id`}
          render={(props) => {
            const { id } = (props.match.params as VillageRouteParams);

            return (
              <Village
                key={id}
                villageId={id}
              />
            );
          }}
        />
        {villages.length > 0 && (
          <Redirect to={`${match.url}/${villages[0].id}`} />
        )}
      </Switch>
    </div>
  );
};
