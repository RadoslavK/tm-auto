import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

import {
  TextLogEntryContent,
  TextLogEntryType,
} from '../../../../_graphql/types/graphql.type';

type StylesProps = {
  readonly isError: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: {
    color: props => props.isError ? 'red' : undefined,
  },
});

type Props = {
  readonly className?: string;
  readonly content: TextLogEntryContent;
};

export const TextLogContent: React.FC<Props> = ({ className, content }) => {
  const classes = useStyles({
    isError: content.messageType === TextLogEntryType.Error,
  });

  return (
    <span className={clsx(className, classes.root)}>
      {content.message}
    </span>
  );
};