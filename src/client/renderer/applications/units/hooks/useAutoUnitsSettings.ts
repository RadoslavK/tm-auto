import { useQuery } from '@apollo/react-hooks';

import { GetAutoUnitsSettings } from '*/graphql_operations/settings.graphql';

import {
  IGetAutoUnitsSettingsQuery,
  IGetAutoUnitsSettingsQueryVariables,
} from '../../../_types/graphql';
import { useVillageContext } from '../../villages/context/villageContext';

export const useGetAutoUnitsSettings = (): IGetAutoUnitsSettingsQuery['autoUnitsSettings'] | null => {
  const { villageId } = useVillageContext();

  const { data, loading } = useQuery<IGetAutoUnitsSettingsQuery, IGetAutoUnitsSettingsQueryVariables>(
    GetAutoUnitsSettings,
    { variables: { villageId } },
  );

  return loading || !data
    ? null
    : data.autoUnitsSettings;
};