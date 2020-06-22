import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';

import { Duration, Resources } from '../../../_graphql/graphqlHooks';
import { formatTimeFromDuration } from '../../../utils/formatTime';
import { imageLinks } from '../../../utils/imageLinks';
import { createFormatter } from '../../../utils/numberFormatting';

type Props = {
  readonly className?: string;
  readonly buildTime: Duration;
  readonly resources: Resources;
  readonly split?: boolean;
  readonly resourcesBuildTime?: Duration;
  readonly infrastructureBuildTime?: Duration;
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

export const Cost: React.FC<Props> = ({
  buildTime,
  className,
  resources,
  infrastructureBuildTime,
  resourcesBuildTime,
  split,
}) => {
  const classes = useStyles({});
  const time = formatTimeFromDuration(buildTime);
  const resourcesTime =
    resourcesBuildTime && formatTimeFromDuration(resourcesBuildTime);
  const infrastructureTime =
    infrastructureBuildTime && formatTimeFromDuration(infrastructureBuildTime);

  const highestResource = Math.max(
    resources.wood,
    resources.clay,
    resources.iron,
    resources.crop,
  );
  const formatResources = createFormatter(highestResource);
  const formatTotal = createFormatter();
  const formatFreeCrop = createFormatter();
  const totalResources = resources.total;

  return (
    <div className={clsx(className, classes.root)}>
      <span className={clsx(classes.image, classes.wood)} />
      <span className={classes.value}>{formatResources(resources.wood)}</span>
      <span className={clsx(classes.image, classes.clay)} />
      <span className={classes.value}>{formatResources(resources.clay)}</span>
      <span className={clsx(classes.image, classes.iron)} />
      <span className={classes.value}>{formatResources(resources.iron)}</span>
      <span className={clsx(classes.image, classes.crop)} />
      <span className={classes.value}>{formatResources(resources.crop)}</span>
      <span className={clsx(classes.image, classes.total)} />
      <span className={classes.value}>{formatTotal(totalResources)}</span>
      <span className={clsx(classes.image, classes.freeCrop)} />
      <span className={classes.value}>
        {formatFreeCrop(resources.freeCrop)}
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
