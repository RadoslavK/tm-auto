import graphql from 'babel-plugin-relay/macro';
import React, { Suspense } from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import type { MainRoutesQuery } from '../../../_graphql/__generated__/MainRoutesQuery.graphql.js';
import { NextTasksExecution } from '../../../_shared/components/nextTaskExecution/NextTasksExecution.js';
import { useLazyLoadQuery } from '../../../_shared/hooks/useLazyLoadQuery.js';
import { BotActivity } from '../../BotActivity.js';
import type { NavigationApp } from '../../EnsureMainNavigation.js';

const query = graphql`
  query MainRoutesQuery {
      botActivity
      nextTasksExecution {
          ...NextTasksExecution_timestamp
      }
  }
`;

type Props = {
  readonly navigationApps: readonly NavigationApp[];
};

export const MainRoutes: React.FC<Props> = ({ navigationApps }) => {
  const redirectElement = <Navigate to={navigationApps[0].path}/>;
  const { botActivity, nextTasksExecution } = useLazyLoadQuery<MainRoutesQuery>(query, {}, { fetchPolicy: 'store-and-network' });

  return (
    <div>
      <BotActivity botActivity={botActivity} />
      <NextTasksExecution timestamp={nextTasksExecution} />
      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={redirectElement}
          />
          {navigationApps.map((app) => (
            <Route key={app.path} element={app.element} path={`${app.path}/*`}/>
          ))}
          <Route path="*" element={redirectElement} />
        </Routes>
      </Suspense>
    </div>
  );
};

MainRoutes.displayName = 'MainRoutes';