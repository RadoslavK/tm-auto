import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  useLazyLoadQuery,
} from 'react-relay/hooks';
import { EnsureSignedInBotStateQuery } from '../../../_graphql/__generated__/EnsureSignedInBotStateQuery.graphql.js';

import { SettingsManagement } from '../../settings/management/SettingsManagement.js';
import { SignInForm } from './SignInForm.js';

const botStateQuery = graphql`
  query EnsureSignedInBotStateQuery {
      botState
  }
`;

export const EnsureSignedIn: React.FC = ({ children }) => {
  const { botState } = useLazyLoadQuery<EnsureSignedInBotStateQuery>(botStateQuery, {});

  if (botState === 'None' || botState === 'Pending') {
    return (
      <div>
        <SettingsManagement />
        <SignInForm />
      </div>
    );
  }

  return <>{children}</>;
};
