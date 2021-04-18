import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';

import type { SmithyUnitLevel_autoSmithyUnitLevelSettings$key } from '../../_graphql/__generated__/SmithyUnitLevel_autoSmithyUnitLevelSettings.graphql.js';
import { imageLinks } from '../../utils/imageLinks.js';

const levelSettingsFragmentDef = graphql`
    fragment SmithyUnitLevel_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings {
        minTroops
        targetLevel
    }
`;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  remove: {
    backgroundImage: `url("${imageLinks.actions.delete}")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 12,
    width: 12,
    marginRight: 8,
    cursor: 'pointer',
  },
});

type Props = {
  readonly levelSettingsKey: SmithyUnitLevel_autoSmithyUnitLevelSettings$key;
  readonly onRemove: () => void;
};

export const SmithyUnitLevel: React.FC<Props> = ({ levelSettingsKey, onRemove }) => {
  const classes = useStyles();
  const { minTroops, targetLevel } = useFragment(levelSettingsFragmentDef, levelSettingsKey);

  return (
    <div className={classes.root}>
      <div className={classes.remove} onClick={onRemove} />
      <div>
        <span><b>Level</b>: {targetLevel}</span>
        {minTroops > 0 && <span>, <b>Min troops</b>: {minTroops}</span>}
      </div>
    </div>
  );
};

SmithyUnitLevel.displayName = 'SmithyUnitLevel';