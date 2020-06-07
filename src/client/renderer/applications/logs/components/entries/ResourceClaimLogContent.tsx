import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

import { ResourceClaimLogEntryContent } from '../../../../_graphql/graphqlHooks';
import { Resource } from '../../../villages/components/Resource';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
});

type Props = {
  readonly className?: string;
  readonly content: ResourceClaimLogEntryContent;
};

export const ResourceClaimLogContent: React.FC<Props> = ({ className, content }) => {
  const classes = useStyles();

  const {
    reason,
    resources,
  } = content;

  return (
    <div className={clsx(className, classes.root)}>
      <span>Claiming hero resources for {reason}, amount: </span>
      <Resource
        amount={resources.wood}
        resourceName="wood"
      />
      <Resource
        amount={resources.clay}
        resourceName="clay"
      />
      <Resource
        amount={resources.iron}
        resourceName="iron"
      />
      <Resource
        amount={resources.crop}
        resourceName="crop"
      />
    </div>
  );
};