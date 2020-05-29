import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';

import {
  AutoBuildLogEntryContent,
  AutoUnitsLogEntryContent,
  LogEntryFragment,
  TextLogEntryContent,
} from '../../../_graphql/types/graphql.type';
import { formatVillageName } from '../../../utils/formatVillageName';
import { AutoBuildLogContent } from './entries/AutoBuildLogContent';
import { AutoUnitsLogContent } from './entries/AutoUnitsLogContent';
import { TextLogContent } from './entries/TextLogContent';

type Content = LogEntryFragment['content'];

type Props = {
  readonly logEntry: LogEntryFragment;
};

const isTextEntry = (content: Content): content is TextLogEntryContent => (content as TextLogEntryContent).message !== undefined;
const isAutoBuildEntry = (content: Content): content is AutoBuildLogEntryContent => (content as AutoBuildLogEntryContent).fieldId !== undefined;
const isAutoUnitsEntry = (content: Content): content is AutoUnitsLogEntryContent => (content as AutoUnitsLogEntryContent).unitName !== undefined;

const getContentNode = ({ content }: LogEntryFragment, className: string): JSX.Element => {
  if (isTextEntry(content)) {
    return (
      <TextLogContent
        className={className}
        content={content}
      />
    );
  }

  if (isAutoBuildEntry(content)) {
    return (
      <AutoBuildLogContent
        className={className}
        content={content}
      />
    );
  }

  if (isAutoUnitsEntry(content)) {
    return (
      <AutoUnitsLogContent
        className={className}
        content={content}
      />
    );
  }

  throw new Error(`Unknown content: ${JSON.stringify(content)}`);
};

const getVillageNode = ({ village }: LogEntryFragment, className: string): JSX.Element | null => {
  if (!village) {
    return null;
  }

  return (
    <Link
      className={className}
      to={`/villages/${village.id}`}
    >
      {formatVillageName(village)}
    </Link>
  );
};

const useStyles = makeStyles({
  content: {
    flex: 6,
  },
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  timestamp: {
    flex: 2,
  },
  village: {
    flex: 2,
  },
});

export const LogEntry: React.FC<Props> = ({ logEntry }) => {
  const classes = useStyles();

  const contentNode = getContentNode(logEntry, classes.content);
  const villageNode = getVillageNode(logEntry, classes.village);

  return (
    <div className={classes.root}>
      <span className={classes.timestamp}>
        {new Date(logEntry.timestamp.totalSeconds * 1000).toLocaleString()}
      </span>
      {villageNode}
      <span className={classes.content}>
        {contentNode}
      </span>
    </div>
  );
};
