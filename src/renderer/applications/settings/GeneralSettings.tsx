import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';

import { GeneralSettingsForm } from './GeneralSettingsForm';

export const GeneralSettings: React.FunctionComponent = () => {
  const [isFormShown, setIsFormShown] = useState(false);

  const showForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  return (
    <div>
      <button onClick={showForm}>General settings</button>
      <Dialog onClose={closeForm} open={isFormShown}>
        <GeneralSettingsForm />
      </Dialog>
    </div>
  );
};
