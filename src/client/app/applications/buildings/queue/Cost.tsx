import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';

import { ICost } from '../../../../_types/graphql';
import { formatTimeFromDuration } from '../../../../../server/utils/formatTime';
import { imageLinks } from '../../../../utils/imageLinks';
import { createFormatter } from '../../../utils/numberFormatting';
import { getTotalResources } from '../../../utils/resources';

interface IProps {
  readonly className?: string;
  readonly cost: ICost;
}

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

export const Cost: React.FC<IProps> = (props) => {
  const {
    className,
    cost: {
      buildTime,
      resources,
    },
  } = props;

  const classes = useStyles({});
  const time = formatTimeFromDuration(buildTime);

  const highestResource = Math.max(resources.wood, resources.clay, resources.iron, resources.crop);
  const formatResources = createFormatter(highestResource);
  const formatTotal = createFormatter();
  const formatFreeCrop = createFormatter();

  const totalResources = getTotalResources(resources);

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
      <span className={classes.value}>{formatFreeCrop(resources.freeCrop)}</span>

      <span className={clsx(classes.image, classes.buildTime)} />
      <span className={classes.value}>{time}</span>
    </div>
  );
};
