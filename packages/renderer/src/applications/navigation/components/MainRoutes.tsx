import graphql from 'babel-plugin-relay/macro';
import React, { Suspense } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import type { MainRoutesQuery } from '../../../_graphql/__generated__/MainRoutesQuery.graphql.js';
import { NextTasksExecution } from '../../../_shared/components/nextTaskExecution/NextTasksExecution.js';
import { BotActivity } from '../../BotActivity.js';
import { navigationApps } from './Navigation.js';

const query = graphql`
  query MainRoutesQuery {
      isBotActive
      nextTasksExecution {
          ...NextTasksExecution_timestamp
      }
  }
`;

export const MainRoutes: React.FC = () => {
  const redirectElement = <Navigate to={navigationApps[0].path}/>;
  const { isBotActive, nextTasksExecution } = useLazyLoadQuery<MainRoutesQuery>(query, {});

  return (
    <div>
      <BotActivity isBotActive={isBotActive} />
      <NextTasksExecution timestamp={nextTasksExecution} />
      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={redirectElement}
          />
          {navigationApps.map((app) => (
            <Route key={app.path} element={<app.component />} path={`${app.path}/*`}/>
          ))}
          <Route path="*" element={redirectElement} />
        </Routes>
      </Suspense>
    </div>
  );
};

MainRoutes.displayName = 'MainRoutes';