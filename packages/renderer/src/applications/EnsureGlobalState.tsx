import graphql from 'babel-plugin-relay/macro';
import React, { useEffect } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useSetRecoilState } from 'recoil';

import type { EnsureGlobalStateGameInfoQuery } from '../_graphql/__generated__/EnsureGlobalStateGameInfoQuery.graphql.js';
import { tribeState } from '../_recoil/atoms/tribe.js';

type Props = {
  readonly children: React.ReactNode;
}

const gameInfoQuery = graphql`
  query EnsureGlobalStateGameInfoQuery {
      gameInfo {
          tribe
      }
  }
`;

export const EnsureGlobalState: React.FC<Props> = ({ children }) => {
  const setTribeState = useSetRecoilState(tribeState);

  const { gameInfo } = useLazyLoadQuery<EnsureGlobalStateGameInfoQuery>(gameInfoQuery, {});

  useEffect(() => {
    setTribeState(gameInfo.tribe);
  }, [setTribeState, gameInfo]);

  return (
    <>{children}</>
  );
};

EnsureGlobalState.displayName = 'EnsureGlobalState';