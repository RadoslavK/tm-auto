import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

import {
  ActiveVillageId,
  ActiveVillageIdChanged,
  GetVillages,
  UpdateVillages,
} from '*/graphql_operations/village.graphql';

import {
  IActiveVillageIdChangedSubscription,
  IActiveVillageIdQuery,
  IGetVillagesQuery,
  IUpdateVillagesSubscription,
} from '../../../_types/graphql';
import { VillageSideItem } from './sideMenu/VillageSideItem';
import { Village } from './Village';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  sideMenu: {
    flex: '0 0 300px',
  },
});

interface IVillageRouteParams {
  readonly id: string;
}

export const Villages: React.FC = () => {
  const match = useRouteMatch();
  const [activeVillageId, setActiveVillageId] = useState<number>();

  const classes = useStyles();

  const { data, loading, refetch } = useQuery<IGetVillagesQuery>(GetVillages);

  useSubscription<IUpdateVillagesSubscription>(UpdateVillages, {
    onSubscriptionData: () => {
      refetch();
    },
  });

  const activeVillageIdQueryResult = useQuery<IActiveVillageIdQuery>(ActiveVillageId);

  useEffect(() => {
    if (!activeVillageIdQueryResult.loading && activeVillageIdQueryResult.data) {
      setActiveVillageId(activeVillageIdQueryResult.data.activeVillageId);
    }
  }, [activeVillageIdQueryResult]);

  useSubscription<IActiveVillageIdChangedSubscription>(ActiveVillageIdChanged, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && subscriptionData.data) {
        setActiveVillageId(subscriptionData.data.activeVillageIdChanged);
      }
    },
  });

  if (loading || !data || activeVillageIdQueryResult.loading) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.sideMenu}>
        {data.villages.map(village => (
          <VillageSideItem
            key={village.id}
            village={village}
            isVillageActive={village.id === activeVillageId}
          />
        ))}
      </div>
      <Switch>
        <Route path={`${match.path}/:id`} render={(props: RouteComponentProps<IVillageRouteParams>) => <Village villageId={+props.match.params.id} />} />
        {data.villages.length > 0 && (
          <Redirect to={`${match.url}/${data.villages[0].id}`} />
        )}
      </Switch>
    </div>
  );
};
