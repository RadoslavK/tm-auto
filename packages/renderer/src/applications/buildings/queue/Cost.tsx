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
  readonly buildTime: Cost_duration$key;
  readonly dontWrapResources?: boolean;
  readonly infrastructureBuildTime?: Cost_duration$key;
  readonly resources: Cost_resources$key;
  readonly resourcesBuildTime?: Cost_duration$key;
  readonly split?: boolean;
};

type StylesProps = {
  readonly dontWrapResources: boolean | undefined;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: ({ dontWrapResources }) => dontWrapResources
    ? {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }
    : {},
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
  buildTimeRow: {
    display: 'flex',
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
  dontWrapResources,
  infrastructureBuildTime,
  resources,
  resourcesBuildTime,
  split,
}) => {
  const resourcesFragment = useFragment(costResourcesFragment, resources);
  const buildTimeFragment = useFragment(costDurationFragment, buildTime);
  const infrastructureBuildTimeFragment = useFragment(costDurationFragment, infrastructureBuildTime || null);
  const resourcesBuildTimeFragment = useFragment(costDurationFragment, resourcesBuildTime || null);

  const classes = useStyles({ dontWrapResources });
  const time = formatTime(buildTimeFragment);
  const resourcesTime =
    resourcesBuildTimeFragment && formatTime(resourcesBuildTimeFragment);
  const infrastructureTime =
    infrastructureBuildTimeFragment && formatTime(infrastructureBuildTimeFragment);

  return (
    <div className={classes.root}>
      <Resources dontWrap={dontWrapResources} resourcesKey={resourcesFragment} />
      {!infrastructureTime || !resourcesTime || !split ? (
        <div className={classes.buildTimeRow}>
          <div className={clsx(classes.image, classes.buildTime)} title="Build time" />
          <div className={classes.value}>{time}</div>
        </div>
      ) : (
        <div className={classes.buildTimeRow}>
          <div
            className={clsx(classes.image, classes.buildTime)}
            title="Resources build time"
          />
          <div className={classes.value}>
            {resourcesTime}
          </div>
          <div
            className={clsx(classes.image, classes.buildTime)}
            title="Infrastructure build time"
          />
          <div className={classes.value}>
            {infrastructureTime}
          </div>
        </div>
      )}
    </div>
  );
};

Cost.displayName = 'Cost';