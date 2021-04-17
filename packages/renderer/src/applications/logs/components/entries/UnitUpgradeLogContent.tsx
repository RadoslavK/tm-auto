import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React from 'react';
import { useFragment } from 'react-relay/hooks';

import type { UnitUpgradeLogContent_unitUpgradeLogEntryContent$key } from '../../../../_graphql/__generated__/UnitUpgradeLogContent_unitUpgradeLogEntryContent.graphql.js';
import { imageLinks } from '../../../../utils/imageLinks.js';

type StylesProps = {
  readonly unitIndex: number;
};

const useStyles = makeStyles<unknown, StylesProps>({
  image: (props) => ({
    backgroundImage: `url("${imageLinks.getUnit(props.unitIndex)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '18px',
    width: '18px',
  }),
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
});

type Props = {
  readonly className?: string;
  readonly content: UnitUpgradeLogContent_unitUpgradeLogEntryContent$key;
};

const autoBuildLogContentFragment = graphql`
    fragment UnitUpgradeLogContent_unitUpgradeLogEntryContent on UnitUpgradeLogEntryContent {
        unitIndex
        level
    }
`;

export const UnitUpgradeLogContent: React.FC<Props> = ({
  className,
  content,
}) => {
  const {
    unitIndex,
    level,
  } = useFragment(autoBuildLogContentFragment, content);

  const classes = useStyles({
    unitIndex,
  });

  return (
    <div className={clsx(className, classes.root)}>
      {level
        ? (
          <>
            <span>Upgrading</span>
            <div className={classes.image} />
            <span>to {level}</span>
          </>
        )
        : (
          <>
            <span>Researching</span>
            <div className={classes.image} />
          </>
        )}
    </div>
  );
};

UnitUpgradeLogContent.displayName = 'UnitUpgradeLogContent';