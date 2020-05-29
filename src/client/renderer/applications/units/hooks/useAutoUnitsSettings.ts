import { useQuery } from '@apollo/react-hooks';

import { GetAutoUnitsSettings } from '*/graphql_operations/settings.graphql';

import {
  GetAutoUnitsSettingsQuery,
  GetAutoUnitsSettingsQueryVariables,
} from '../../../_graphql/types/graphql.type';
import { useVillageContext } from '../../villages/context/villageContext';

export const useGetAutoUnitsSettings = (): GetAutoUnitsSettingsQuery['autoUnitsSettings'] | null => {
  const { villageId } = useVillageContext();

  const { data, loading } = useQuery<GetAutoUnitsSettingsQuery, GetAutoUnitsSettingsQueryVariables>(
    GetAutoUnitsSettings,
    { variables: { villageId } },
  );

  return loading || !data
    ? null
    : data.autoUnitsSettings;
};