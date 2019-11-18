import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetVillageSettings } from '*/graphql_operations/settings.graphql';
import { IGetVillageSettingsQuery, IGetVillageSettingsQueryVariables } from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../villages/context/VillageContext';
import { AutoBuildSettings } from './village/AutoBuildSettings';
import { GeneralVillageSettings } from './GeneralVillageSettings';

const VillageSettings: React.FunctionComponent = () => {
  const { villageId } = useContext<IVillageContext>(VillageContext);
  const { data, loading } = useQuery<IGetVillageSettingsQuery, IGetVillageSettingsQueryVariables>(GetVillageSettings, {
    fetchPolicy: 'network-only',
    variables: { villageId },
  });

  if (loading || !data) {
    return null;
  }

  const {
    autoBuild,
    general,
  } = data.villageSettings;

  return (
    <div>
      <div>
        <h1>Village settings</h1>
        <GeneralVillageSettings settings={general} />
        <AutoBuildSettings settings={autoBuild} />
      </div>
    </div>
  );
};

VillageSettings.displayName = 'VillageSettings';

export { VillageSettings };
