import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React, {
  Suspense,
  useEffect,
  useMemo,
} from 'react';
import {
  useQueryLoader,
  useSubscription,
} from 'react-relay/hooks';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useMatch,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { BuildingSpotsSubscription } from '../../../_graphql/__generated__/BuildingSpotsSubscription.graphql.js';
import type { InfrastructureQuery } from '../../../_graphql/__generated__/InfrastructureQuery.graphql.js';
import type { ResourceFieldsQuery } from '../../../_graphql/__generated__/ResourceFieldsQuery.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { usePrevious } from '../../../_shared/hooks/usePrevious.js';
import {
  Infrastructure,
  infrastructureQuery,
} from './Infrastructure.js';
import {
  ResourceFields,
  resourceFieldsQuery,
} from './ResourceFields.js';

const subscription = graphql`
    subscription BuildingSpotsSubscription($villageId: ID!) {
        onBuildingSpotUpdated(villageId: $villageId) {
            ...BuildingSpot_buildingSpot
        }
    }
`;

const useStyles = makeStyles({
  tab: {
    marginRight: 8,
  },
  activeTab: {
    color: 'green',
  },
});

const tabsPaths = ['resources', 'infrastructure'] as const;

type TabPath = typeof tabsPaths[number];

type Tab = {
  readonly label: string;
  readonly preloadQuery: () => void;
};

type Props = {
  readonly className?: string;
};

export const BuildingSpots: React.FC<Props> = ({ className }) => {
  const classes = useStyles();
  const villageId = useRecoilValue(selectedVillageIdState);

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingSpotsSubscription> => ({
    subscription,
    variables: {
      villageId,
    },
  }), [villageId]);

  useSubscription(subscriptionConfig);

  const [resourceFieldsQueryRef, loadResourceFieldsQuery] = useQueryLoader<ResourceFieldsQuery>(resourceFieldsQuery);
  const [infrastructureQueryRef, loadInfrastructureQuery] = useQueryLoader<InfrastructureQuery>(infrastructureQuery);

  const tabs: Record<TabPath, Tab> = {
    resources: {
      label: 'Resources',
      preloadQuery: () => loadResourceFieldsQuery({ villageId }, { fetchPolicy: 'store-and-network' }),
    },
    infrastructure: {
      label: 'Infrastructure',
      preloadQuery: () => loadInfrastructureQuery({ villageId }, { fetchPolicy: 'store-and-network' }),
    },
  };

  const selectedTab = useMatch('/villages/:id/buildings/:tab')?.params.tab as TabPath | undefined;
  const prevTab = usePrevious(selectedTab);
  const prevVillageId = usePrevious(villageId);

  useEffect(() => {
    if (prevVillageId === villageId && (prevTab || !selectedTab)) {
      return;
    }

    switch (selectedTab) {
      case 'resources':  loadResourceFieldsQuery({ villageId }); break;
      case 'infrastructure':  loadInfrastructureQuery({ villageId }); break;
    }
  }, [villageId, prevVillageId, selectedTab, prevTab, resourceFieldsQueryRef, loadResourceFieldsQuery, infrastructureQueryRef, loadInfrastructureQuery]);

  const getTabElement = (path: TabPath) => {
    switch (path) {
      case 'resources': return resourceFieldsQueryRef && <ResourceFields queryRef={resourceFieldsQueryRef} />;
      case 'infrastructure':  return infrastructureQueryRef && <Infrastructure queryRef={infrastructureQueryRef} />;
      default: throw new Error(`Unknown tab path ${path}`);
    }
  };

  return (
    <div className={className}>
      <div>
        {Object.entries(tabs).map(([path, params]) => {
          const isTabActive = path === selectedTab;

          return (
            <Link
              key={path}
              className={clsx(classes.tab, isTabActive && classes.activeTab)}
              to={path}
              onMouseOver={params.preloadQuery}
            >
              {params.label}
            </Link>
          );
        })}
      </div>
      <Routes>
        {Object.keys(tabs).map(path => (
          <Route
            key={path}
            path={path}
            element={(
              <Suspense fallback={null}>
                {getTabElement(path as TabPath)}
              </Suspense>
            )}
          />
        ))}
        <Route path="*" element={<Navigate to={Object.keys(tabs)[0]} />} />
      </Routes>
    </div>
  );
};

BuildingSpots.displayName = 'BuildingSpots';