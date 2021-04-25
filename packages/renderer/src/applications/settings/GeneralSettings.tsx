import {
  Dialog,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import React, { useState } from 'react';

import type { GeneralSettingsForm_generalSettings$key } from '../../_graphql/__generated__/GeneralSettingsForm_generalSettings.graphql.js';
import { imageLinks } from '../../utils/imageLinks.js';
import { GeneralSettingsForm } from './GeneralSettingsForm.js';

const useStyles = makeStyles({
  settings: {
    backgroundImage: `url("${imageLinks.misc.settings}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '2em',
    width: '2em',
    marginRight: 4,
    cursor: 'pointer',
  },
});

type Props = {
  readonly settingsKey: GeneralSettingsForm_generalSettings$key;
};

export const GeneralSettings: React.FC<Props> = ({ settingsKey }) => {
  const classes = useStyles();
  const [isFormShown, setIsFormShown] = useState(false);

  const showForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  return (
    <>
      <Tooltip title="Open General settings">
        <div
          className={classes.settings}
          onClick={showForm}
        />
      </Tooltip>
      <Dialog onClose={closeForm} open={isFormShown}>
        <GeneralSettingsForm settingsKey={settingsKey} />
      </Dialog>
    </>
  );
};

GeneralSettings.displayName = 'GeneralSettings';