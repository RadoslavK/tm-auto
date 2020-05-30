import { useMutation } from '@apollo/client';

import { UpdateAutoUnitsBuildingSettings } from '*/graphql_operations/settings.graphql';

import {
  UpdateAutoUnitsBuildingSettingsMutation,
  UpdateAutoUnitsBuildingSettingsMutationVariables,
} from '../../../_graphql/types/graphql.type';

export const useUpdateAutoUnitsBuildingSettingsMutation = () => {
  const [updateSettings] = useMutation<UpdateAutoUnitsBuildingSettingsMutation, UpdateAutoUnitsBuildingSettingsMutationVariables>(
    UpdateAutoUnitsBuildingSettings,
  );

  return updateSettings;
};