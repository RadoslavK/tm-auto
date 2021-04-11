import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { formatTime } from 'shared/utils/formatTime.js';

import type { Cost_duration$key } from '../../../_graphql/__generated__/Cost_duration.graphql.js';
import type { Cost_resources$key } from '../../../_graphql/__generated__/Cost_resources.graphql.js';
import { Resources } from '../../../_shared/components/Resources.js';
import { imageLinks } from '../../../utils/imageLinks.js';

type Props = {
  readonly className?: string;
  readonly buildTime: Cost_duration$key;
  readonly resources: Cost_resources$key;
  readonly split?: boolean;
  readonly resourcesBuildTime?: Cost_duration$key;
  readonly infrastructureBuildTime?: Cost_duration$key;
};

const useStyles = makeStyles({
  buildTime: {
    backgroundImage: `url("${imageLinks.cost.buildTime}")`,
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '2em',
    marginLeft: 5,
    width: '2em',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  value: {
    marginLeft: 5,
    verticalAlign: 'top',
  },
});

const costResourcesFragment = graphql`
  fragment Cost_resources on Resources {
     ...Resources_resources
  }
`;

const costDurationFragment = graphql`
  fragment Cost_duration on Duration {
      ...Duration @relay(mask: false)
  }
`;

export const Cost: React.FC<Props> = ({
  buildTime,
  className,
  resources,
  infrastructureBuildTime,
  resourcesBuildTime,
  split,
}) => {
  const resourcesFragment = useFragment(costResourcesFragment, resources);
  const buildTimeFragment = useFragment(costDurationFragment, buildTime);
  const infrastructureBuildTimeFragment = useFragment(costDurationFragment, infrastructureBuildTime || null);
  const resourcesBuildTimeFragment = useFragment(costDurationFragment, resourcesBuildTime || null);

  const classes = useStyles();
  const time = formatTime(buildTimeFragment);
  const resourcesTime =
    resourcesBuildTimeFragment && formatTime(resourcesBuildTimeFragment);
  const infrastructureTime =
    infrastructureBuildTimeFragment && formatTime(infrastructureBuildTimeFragment);

  return (
    <div className={clsx(className, classes.root)}>
      <Resources resourcesKey={resourcesFragment} />
      {!infrastructureTime || !resourcesTime || !split ? (
        <>
          <span className={clsx(classes.image, classes.buildTime)} />
          <span className={classes.value}>{time}</span>
        </>
      ) : (
        <>
          <span
            className={clsx(classes.image, classes.buildTime)}
            title="Resources"
          />
          <span className={classes.value} title="Resources">
            {resourcesTime}
          </span>
          <span
            className={clsx(classes.image, classes.buildTime)}
            title="Infrastructure"
          />
          <span className={classes.value} title="Infrastructure">
            {infrastructureTime}
          </span>
        </>
      )}
    </div>
  );
};

Cost.displayName = 'Cost';