import React, { Suspense } from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { NextTasksExecution } from '../../../_shared/components/nextTaskExecution/NextTasksExecution.js';
import { BotActivity } from '../../BotActivity.js';
import { navigationApps } from './Navigation.js';

export const MainRoutes: React.FC = () => {
  const redirectElement = <Navigate to={navigationApps[0].path}/>;

  return (
    <div>
      <BotActivity/>
      <NextTasksExecution/>
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