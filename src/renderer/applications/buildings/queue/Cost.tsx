import makeStyles from '@material-ui/core/styles/makeStyles';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { formatTime } from '../../../../_shared/utils/formatTime';
import { Cost_duration$key } from '../../../_graphql/__generated__/Cost_duration.graphql';

import { imageLinks } from '../../../utils/imageLinks';
import { createFormatter } from '../../../utils/numberFormatting';
import { Cost_resources$key } from '../../../_graphql/__generated__/Cost_resources.graphql';

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
  clay: {
    backgroundImage: `url("${imageLinks.resources.clay}")`,
  },
  crop: {
    backgroundImage: `url("${imageLinks.resources.crop}")`,
    backgroundSize: 'contain',
  },
  freeCrop: {
    backgroundImage: `url("${imageLinks.resources.freeCrop}")`,
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '2em',
    marginLeft: 5,
    width: '2em',
  },
  iron: {
    backgroundImage: `url("${imageLinks.resources.iron}")`,
    backgroundSize: 'contain',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  total: {
    backgroundImage: `url("${imageLinks.resources.total}")`,
  },
  value: {
    marginLeft: 5,
    verticalAlign: 'top',
  },
  wood: {
    backgroundImage: `url("${imageLinks.resources.wood}")`,
  },
});

const costResourcesFragment = graphql`
  fragment Cost_resources on Resources {
      wood
      clay
      iron
      crop
      freeCrop
      total
  }
`;

const costDurationFragment = graphql`
  fragment Cost_duration on Duration {
      days
      hours
      minutes
      seconds
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

  const classes = useStyles({});
  const time = formatTime(buildTimeFragment);
  const resourcesTime =
    resourcesBuildTimeFragment && formatTime(resourcesBuildTimeFragment);
  const infrastructureTime =
    infrastructureBuildTimeFragment && formatTime(infrastructureBuildTimeFragment);

  const highestResource = Math.max(
    resourcesFragment.wood,
    resourcesFragment.clay,
    resourcesFragment.iron,
    resourcesFragment.crop,
  );
  const formatResources = createFormatter(highestResource);
  const formatTotal = createFormatter();
  const formatFreeCrop = createFormatter();
  const totalResources = resourcesFragment.total;

  return (
    <div className={clsx(className, classes.root)}>
      <span className={clsx(classes.image, classes.wood)} />
      <span className={classes.value}>{formatResources(resourcesFragment.wood)}</span>
      <span className={clsx(classes.image, classes.clay)} />
      <span className={classes.value}>{formatResources(resourcesFragment.clay)}</span>
      <span className={clsx(classes.image, classes.iron)} />
      <span className={classes.value}>{formatResources(resourcesFragment.iron)}</span>
      <span className={clsx(classes.image, classes.crop)} />
      <span className={classes.value}>{formatResources(resourcesFragment.crop)}</span>
      <span className={clsx(classes.image, classes.total)} />
      <span className={classes.value}>{formatTotal(totalResources)}</span>
      <span className={clsx(classes.image, classes.freeCrop)} />
      <span className={classes.value}>
        {formatFreeCrop(resourcesFragment.freeCrop)}
      </span>
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
