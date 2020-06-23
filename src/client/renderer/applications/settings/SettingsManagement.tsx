import React from 'react';

import { useExportSettingsMutation } from '../../_graphql/graphqlHooks';
import { GeneralSettings } from './GeneralSettings';

export const SettingsManagement: React.FunctionComponent = () => {
  const [exportSettings] = useExportSettingsMutation();

  const saveToFile = () => {
    const fileName = window.api.openSaveFileDialog();

    if (!fileName) {
      return;
    }

    exportSettings({
      variables: { path: fileName },
    });
  };

  return (
    <>
      <GeneralSettings />
      <button onClick={saveToFile}>Export settings</button>
    </>
  );
};
