import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';

import { GetBotState } from '*/graphql_operations/controller.graphql';

import {
  BotState,
  IGetBotStateQuery,
} from '../../../_types/graphql';
import { SignInForm } from './SignInForm';

export const EnsureSignedIn: React.FC = (props) => {
  const { data, loading } = useQuery<IGetBotStateQuery>(GetBotState);

  if (loading) {
    return null;
  }

  if (!data || data.botState === BotState.None || data.botState === BotState.Pending) {
    return <SignInForm />;
  }

  return <>{props.children}</>;
};
