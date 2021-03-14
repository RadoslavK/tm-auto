import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';

import { GeneralSettings } from '../GeneralSettings';
import { SettingsManagementForm } from './SettingsManagementForm';

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
