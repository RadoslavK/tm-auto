import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';

import {
  IAutoBuildLogEntryContent,
  IAutoUnitsLogEntryContent,
  ILogEntryFragment,
  ITextLogEntryContent,
} from '../../../../_types/graphql';
import { formatVillageName } from '../../../utils/formatVillageName';
import { AutoBuildLogContent } from './entries/AutoBuildLogContent';
import { AutoUnitsLogContent } from './entries/AutoUnitsLogContent';
import { TextLogContent } from './entries/TextLogContent';

type Content = ILogEntryFragment['content'];

type Props = {
  readonly logEntry: ILogEntryFragment;
};

const isTextEntry = (content: Content): content is ITextLogEntryContent => (content as ITextLogEntryContent).text !== undefined;
const isAutoBuildEntry = (content: Content): content is IAutoBuildLogEntryContent => (content as IAutoBuildLogEntryContent).autoBuild !== undefined;
const isAutoUnitsEntry = (content: Content): content is IAutoUnitsLogEntryContent => (content as IAutoUnitsLogEntryContent).autoUnits !== undefined;

const getContentNode = ({ content }: ILogEntryFragment, className: string): JSX.Element => {
  if (isTextEntry(content)) {
    return (
      <TextLogContent
        className={className}
        content={content.text}
      />
    );
  }

  if (isAutoBuildEntry(content)) {
    return (
      <AutoBuildLogContent
        className={className}
        content={content.autoBuild}
      />
    );
  }

  if (isAutoUnitsEntry(content)) {
    return (
      <AutoUnitsLogContent
        className={className}
        content={content.autoUnits}
      />
    );
  }

  throw new Error(`Unknown content: ${JSON.stringify(content)}`);
};

const getVillageNode = ({ village }: ILogEntryFragment, className: string): JSX.Element | null => {
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
        {new Date(logEntry.timestamp * 1000).toLocaleString()}
      </span>
      {villageNode}
      <span className={classes.content}>
        {contentNode}
      </span>
    </div>
  );
};
