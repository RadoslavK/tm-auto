import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React from 'react';
import { useFragment } from 'react-relay/hooks';

import type { TextLogContent_textLogentryContent$key } from '../../../../_graphql/__generated__/TextLogContent_textLogentryContent.graphql.js';

type StylesProps = {
  readonly isError: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: {
    color: (props) => (props.isError ? 'red' : undefined),
  },
});

type Props = {
  readonly className?: string;
  readonly content: TextLogContent_textLogentryContent$key;
};

const textLogContentFragment = graphql`
  fragment TextLogContent_textLogentryContent on TextLogEntryContent {
      message
      messageType
  }
`;

export const TextLogContent: React.FC<Props> = ({ className, content }) => {
  const { message, messageType } = useFragment(textLogContentFragment, content);

  const classes = useStyles({
    isError: messageType === 'Error',
  });

  return (
    <span className={clsx(className, classes.root)}>{message}</span>
  );
};

TextLogContent.displayName = 'TextLogContent';