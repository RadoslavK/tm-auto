import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';

import { GeneralSettings } from '../GeneralSettings.js';
import { SettingsManagementForm } from './SettingsManagementForm.js';

export const SettingsManagement: React.FunctionComponent = () => {
  const [isFormShown, setIsFormShown] = useState(false);

  const openForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  return (
    <>
      <GeneralSettings />
      <button onClick={openForm}>Export/Import settings</button>
      <Dialog onClose={closeForm} open={isFormShown}>
        <SettingsManagementForm />
      </Dialog>
    </>
  );
};
