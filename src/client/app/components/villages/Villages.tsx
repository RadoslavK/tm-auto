import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import React, {
  useContext,
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
import {
  ISideMenuContext,
  SideMenuContext,
} from '../sideMenu/context/sideMenuContext';
import { Village } from './Village';

interface IVillageRouteParams {
  readonly id: string;
}

export const Villages: React.FC = () => {
  const match = useRouteMatch();
  const { setItems, items } = useContext<ISideMenuContext>(SideMenuContext);
  const [activeVillageId, setActiveVillageId] = useState<number>();

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

  useEffect(() => {
    const navigationItems = data
      ? data.villages.map(village => {
        const modifiers = [];

        if (village.isCapital) {
          modifiers.push('c');
        }

        if (village.id === activeVillageId) {
          modifiers.push('a');
        }

        return {
          text: `${village.name}${modifiers.length ? ` (${modifiers.join(',')})` : ''}`,
          path: `${match.url}/${village.id}`,
        };
      })
      : [];

    setItems(navigationItems);

    return () => setItems([]);
  }, [setItems, data, match.url, activeVillageId]);

  if (loading || activeVillageIdQueryResult.loading) {
    return null;
  }

  return (
    <Switch>
      <Route path={`${match.path}/:id`} render={(props: RouteComponentProps<IVillageRouteParams>) => <Village villageId={+props.match.params.id} />} />
      {items.length > 0 && (
        <Redirect to={items[0].path} />
      )}
    </Switch>
  );
};
