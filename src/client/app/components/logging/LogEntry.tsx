import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { TextLogContent } from './entries/TextLogContent';
import { AutoBuildLogContent } from './entries/AutoBuildLogContent';
import { AutoUnitsLogContent } from './entries/AutoUnitsLogContent';
import {
  IAutoBuildLogEntryContent,
  IAutoUnitsLogEntryContent,
  ILogEntryFragmentFragment,
  ITextLogEntryContent,
} from '../../../_types/graphql';

type Content = ILogEntryFragmentFragment['content'];

interface IProps {
  readonly logEntry: ILogEntryFragmentFragment;
}

const isTextEntry = (content: Content): content is ITextLogEntryContent => (content as ITextLogEntryContent).text !== undefined;
const isAutoBuildEntry = (content: Content): content is IAutoBuildLogEntryContent => (content as IAutoBuildLogEntryContent).autoBuild !== undefined;
const isAutoUnitsEntry = (content: Content): content is IAutoUnitsLogEntryContent => (content as IAutoUnitsLogEntryContent).autoUnits !== undefined;

const getContentNode = (content: Content, className: string): JSX.Element => {
  if (isTextEntry(content)) {
    return <TextLogContent content={content.text} className={className} />;
  }

  if (isAutoBuildEntry(content)) {
    return <AutoBuildLogContent content={content.autoBuild} className={className} />;
  }

  if (isAutoUnitsEntry(content)) {
    return <AutoUnitsLogContent content={content.autoUnits} className={className} />;
  }
  
  throw new Error(`Unknown content: ${JSON.stringify(content)}`);
};

const useStyles = makeStyles({
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
  content: {
    flex: 6,
  },
});

export const LogEntry: React.FC<IProps> = (props) => {
  const {
    logEntry,
  } = props;

  const classes = useStyles();
  
  const contentNode = getContentNode(logEntry.content, classes.content);

  const getVillageNode = (): JSX.Element | null => {
    if (!logEntry.village) {
      return null;
    }
    
    return (
      <Link to={`/villages/${logEntry.village.id}`} className={classes.village}>
        {logEntry.village.name} [{logEntry.village.coords.x}|{logEntry.village.coords.y}]
      </Link>
    );
  };
  
  return (
    <div className={classes.root}>
      <span className={classes.timestamp}>
        {new Date(logEntry.timestamp * 1000).toLocaleString()}
      </span>
      {getVillageNode()}
      <span className={classes.content}>
        {contentNode}
      </span>
    </div>
  );
};