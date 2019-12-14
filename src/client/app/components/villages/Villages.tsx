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
} from '*/graphql_operations/village.graphql';

import {
  IActiveVillageIdChangedSubscription,
  IActiveVillageIdQuery,
} from '../../../_types/graphql';
import { useVillages } from '../../hooks/villages/useVillages';
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

  const villages = useVillages();
  const [selectedVillageId, setSelectedVillageId] = useState();
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

  if (!villages || activeVillageIdQueryResult.loading) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.sideMenu}>
        {villages.map(village => (
          <VillageSideItem
            key={village.id}
            village={village}
            isVillageActive={village.id === activeVillageId}
            isVillageSelected={village.id === selectedVillageId}
          />
        ))}
      </div>
      <Switch>
        <Route path={`${match.path}/:id`} render={(props: RouteComponentProps<IVillageRouteParams>) => {
          const villageId = +props.match.params.id;
          setSelectedVillageId(villageId)
          return <Village villageId={villageId} />;
        }} />
        {villages.length > 0 && (
          <Redirect to={`${match.url}/${villages[0].id}`} />
        )}
      </Switch>
    </div>
  );
};
