import React from 'react';

import { BotState } from '../../../_graphql/graphqlHooks';
import { useBotState } from '../../../hooks/useBotState';
import { GeneralSettings } from '../../settings/GeneralSettings';
import { SignInForm } from './SignInForm';

export const EnsureSignedIn: React.FC = ({ children }) => {
  const botState = useBotState();

  if (!botState) {
    return null;
  }

  if (botState === BotState.None || botState === BotState.Pending) {
    return (
      <div>
        <GeneralSettings />
        <SignInForm />
      </div>
    );
  }

  return <>{children}</>;
};
