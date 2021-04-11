import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';

import type { GeneralSettingsForm_generalSettings$key } from '../../_graphql/__generated__/GeneralSettingsForm_generalSettings.graphql.js';
import { GeneralSettingsForm } from './GeneralSettingsForm.js';

type Props = {
  readonly settingsKey: GeneralSettingsForm_generalSettings$key;
};

export const GeneralSettings: React.FC<Props> = ({ settingsKey }) => {
  const [isFormShown, setIsFormShown] = useState(false);

  const showForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  return (
    <div>
      <button onClick={showForm}>General settings</button>
      <Dialog onClose={closeForm} open={isFormShown}>
        <GeneralSettingsForm settingsKey={settingsKey} />
      </Dialog>
    </div>
  );
};

GeneralSettings.displayName = 'GeneralSettings';