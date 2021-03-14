import { makeStyles } from '@material-ui/core/styles';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { ResourceClaimLogContent_resourceClaimLogEntryContent$key } from '../../../../_graphql/__generated__/ResourceClaimLogContent_resourceClaimLogEntryContent.graphql';

import { Resource } from '../../../villages/components/Resource';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
});

type Props = {
  readonly className?: string;
  readonly content: ResourceClaimLogContent_resourceClaimLogEntryContent$key;
};

const resourceClaimLogContentFragment = graphql`
  fragment ResourceClaimLogContent_resourceClaimLogEntryContent on ResourceClaimLogEntryContent {
      reason
      resources {
          clay
          crop
          iron
          wood
      }
  }
`;

export const ResourceClaimLogContent: React.FC<Props> = ({
  className,
  content,
}) => {
  const classes = useStyles();

  const { reason, resources } = useFragment(resourceClaimLogContentFragment, content);

  return (
    <div className={clsx(className, classes.root)}>
      <span>Claiming hero resources for {reason}, amount: </span>
      <Resource amount={resources.wood} resourceName="wood" />
      <Resource amount={resources.clay} resourceName="clay" />
      <Resource amount={resources.iron} resourceName="iron" />
      <Resource amount={resources.crop} resourceName="crop" />
    </div>
  );
};
