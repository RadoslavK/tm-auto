import { useMutation } from '@apollo/react-hooks';

import { UpdateAutoUnitsBuildingSettings } from '*/graphql_operations/settings.graphql';

import {
  IUpdateAutoUnitsBuildingSettingsMutation,
  IUpdateAutoUnitsBuildingSettingsMutationVariables,
} from '../../../_types/graphql';

export const useUpdateAutoUnitsBuildingSettingsMutation = () => {
  const [updateSettings] = useMutation<IUpdateAutoUnitsBuildingSettingsMutation, IUpdateAutoUnitsBuildingSettingsMutationVariables>(
    UpdateAutoUnitsBuildingSettings,
  );

  return updateSettings;
};