import React from 'react';

import {
  useExportSettingsMutation,
  useImportSettingsMutation,
} from '../../_graphql/graphqlHooks';
import { GeneralSettings } from './GeneralSettings';

export const SettingsManagement: React.FunctionComponent = () => {
  const [exportSettings] = useExportSettingsMutation();
  const [importSettings] = useImportSettingsMutation();

  const saveToFile = () => {
    const fileName = window.api.openSaveFileDialog();

    if (!fileName) {
      return;
    }

    exportSettings({
      variables: { path: fileName },
    });
  };

  const loadFromFile = () => {
    const fileName = window.api.openLoadfileDialog();

    if (!fileName) {
      return;
    }

    importSettings({
      variables: { path: fileName },
    });
  };

  return (
    <>
      <GeneralSettings />
      <button onClick={saveToFile}>Export settings</button>
      <button onClick={loadFromFile}>Import settings</button>
    </>
  );
};
