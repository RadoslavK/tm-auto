import { useMutation } from '@apollo/react-hooks';

import { UpdateAutoUnitsBuildingSettings } from '*/graphql_operations/settings.graphql';

import {
  UpdateAutoUnitsBuildingSettingsMutation,
  UpdateAutoUnitsBuildingSettingsMutationVariables,
} from '../../../_types/graphql';

export const useUpdateAutoUnitsBuildingSettingsMutation = () => {
  const [updateSettings] = useMutation<UpdateAutoUnitsBuildingSettingsMutation, UpdateAutoUnitsBuildingSettingsMutationVariables>(
    UpdateAutoUnitsBuildingSettings,
  );

  return updateSettings;
};