import { makeStyles } from '@material-ui/core/styles';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import { VillagesQuery } from '../../../_graphql/__generated__/VillagesQuery.graphql';

import { Village } from './Village';
import { VillageSideItem } from './VillageSideItem';
import { VillagesActiveVillageIdQuery } from '../../../_graphql/__generated__/VillagesActiveVillageIdQuery.graphql';

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
    }
`;

const villagesActiveVillageIdQuery = graphql`
    query VillagesActiveVillageIdQuery {
        activeVillageId
    }
`;

export const Villages: React.FC = () => {
  const { villages } = useLazyLoadQuery<VillagesQuery>(villagesQuery, {});
  const { activeVillageId } = useLazyLoadQuery<VillagesActiveVillageIdQuery>(villagesActiveVillageIdQuery, {});

  const classes = useStyles();
  const match = useRouteMatch();

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
