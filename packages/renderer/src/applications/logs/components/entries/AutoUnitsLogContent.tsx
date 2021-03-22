import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React from 'react';
import { useFragment } from 'react-relay/hooks';

import type { AutoUnitsLogContent_autoUnitsLogEntryContent$key } from '../../../../_graphql/__generated__/AutoUnitsLogContent_autoUnitsLogEntryContent.graphql.js';
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
  readonly content: AutoUnitsLogContent_autoUnitsLogEntryContent$key;
};

const autoUnitsLogContentFragment = graphql`
  fragment AutoUnitsLogContent_autoUnitsLogEntryContent on AutoUnitsLogEntryContent {
      amount
      index
      unitName
  }
`;

export const AutoUnitsLogContent: React.FC<Props> = ({
  className,
  content,
}) => {
  const { amount, index, unitName } = useFragment(autoUnitsLogContentFragment, content);

  const classes = useStyles({
    unitIndex: index,
  });

  return (
    <div className={clsx(className, classes.root)}>
      <span>Building {amount}</span>
      <div className={classes.image} />
      <span>{unitName}</span>
    </div>
  );
};
