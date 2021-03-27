import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { Link } from 'react-router-dom';

import type {
  LogEntry_logEntry,
  LogEntry_logEntry$key,
} from '../../../_graphql/__generated__/LogEntry_logEntry.graphql.js';
import { VillageName } from '../../villages/components/VillageName.js';
import { AutoBuildLogContent } from './entries/AutoBuildLogContent.js';
import { AutoUnitsLogContent } from './entries/AutoUnitsLogContent.js';
import { ResourceClaimLogContent } from './entries/ResourceClaimLogContent.js';
import { TextLogContent } from './entries/TextLogContent.js';

type Props = {
  readonly logEntry: LogEntry_logEntry$key;
};

type Content = LogEntry_logEntry['content'];

// TODO: refactor this
const getContentNode = (
  content: Content,
  className: string,
): JSX.Element => {
  const typename = content['__typename'];

  switch (typename) {
    case 'TextLogEntryContent': return <TextLogContent className={className} content={content} />;
    case 'AutoBuildLogEntryContent': return <AutoBuildLogContent className={className} content={content} />;
    case 'AutoUnitsLogEntryContent': return <AutoUnitsLogContent className={className} content={content} />;
    case 'ResourceClaimLogEntryContent': return <ResourceClaimLogContent className={className} content={content} />;
    default: throw new Error(`Invalid typename: ${typename}`);
  }
};

const getVillageNode = (
  village: LogEntry_logEntry['village'],
  className: string,
): JSX.Element | null => {
  if (!village) {
    return null;
  }

  return (
    <Link className={className} to={`/villages/${village.id}`}>
      <VillageName village={village} />
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

//  For some reason the __typename must be included at both levels otherwise its undefined
const logEntryFragment = graphql`
  fragment LogEntry_logEntry on LogEntry {
      __typename
      content {
          __typename
          ...TextLogContent_textLogentryContent
          ...AutoUnitsLogContent_autoUnitsLogEntryContent
          ...AutoBuildLogContent_autoBuildLogEntryContent
          ...ResourceClaimLogContent_resourceClaimLogEntryContent
      }
      timestamp {
          totalSeconds
      }
      village {
          id
          ...VillageName_village
      }
  }
`;

export const LogEntry: React.FC<Props> = ({ logEntry }) => {
  const classes = useStyles();
  const { content, timestamp, village } = useFragment(logEntryFragment, logEntry);

  const contentNode = getContentNode(content, classes.content);
  const villageNode = getVillageNode(village, classes.village);

  return (
    <div className={classes.root}>
      <span className={classes.timestamp}>
        {new Date(timestamp.totalSeconds * 1000).toLocaleString()}
      </span>
      {villageNode}
      <span className={classes.content}>{contentNode}</span>
    </div>
  );
};
