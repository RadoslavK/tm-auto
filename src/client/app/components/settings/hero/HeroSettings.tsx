import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetHeroSettings } from "*/graphql_operations/settings.graphql";
import {
  IGetHeroSettingsQuery, IGetHeroSettingsQueryVariables,
} from '../../../../_types/graphql';
import { HeroInformation } from '../../HeroInformation';
import { AutoAdventureSettings } from './AutoAdventureSettings';

export const HeroSettings: React.FunctionComponent = () => {
  const { loading, data } = useQuery<IGetHeroSettingsQuery, IGetHeroSettingsQueryVariables>(GetHeroSettings, {
    fetchPolicy: 'network-only',
  });

  if (loading || !data) {
    return null;
  }

  const {
    autoAdventure,
  } = data.hero;

  return (
    <div>
      <h1>Hero settings</h1>
      <HeroInformation />
      <AutoAdventureSettings settings={autoAdventure} />;
    </div>
  );
};
