import React from 'react';

import { BotState } from '../../../_graphql/types/graphql.type';
import { useBotState } from '../../../hooks/useBotState';
import { SignInForm } from './SignInForm';

export const EnsureSignedIn: React.FC = ({ children }) => {
  const botState = useBotState();

  if (!botState) {
    return null;
  }

  if (botState === BotState.None || botState === BotState.Pending) {
    return <SignInForm />;
  }

  return <>{children}</>;
};
