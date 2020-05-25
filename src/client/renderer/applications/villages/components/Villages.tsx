import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

import { useVillages } from '../../../hooks/villages/useVillages';
import { useActiveVillageId } from '../hooks/useActiveVillageId';
import { Village } from './Village';
import { VillageSideItem } from './VillageSideItem';

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

export const Villages: React.FC = () => {
  const classes = useStyles();
  const match = useRouteMatch();

  const villages = useVillages();
  const activeVillageId = useActiveVillageId();

  if (!villages || activeVillageId === undefined) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.sideMenu}>
        <Route
          path={`${match.path}/:selectedVillageId`}
          render={(props: RouteComponentProps<{ readonly selectedVillageId: string; }>) => {
            const selectedVillageId = +props.match.params.selectedVillageId;

            return (
              <>
                {villages.map(village => (
                  <VillageSideItem
                    key={village.id}
                    isVillageActive={village.id === activeVillageId}
                    isVillageSelected={village.id === selectedVillageId}
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
          render={(props: RouteComponentProps<VillageRouteParams>) => <Village villageId={+props.match.params.id} />}
        />
        {villages.length > 0 && (
          <Redirect to={`${match.url}/${villages[0].id}`} />
        )}
      </Switch>
    </div>
  );
};
