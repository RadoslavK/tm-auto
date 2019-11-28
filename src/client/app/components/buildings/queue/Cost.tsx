import makeStyles from '@material-ui/core/styles/makeStyles';
import classNames from 'classnames';
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
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  value: {
    marginLeft: 5,
    verticalAlign: 'top',
  },
  image: {
    marginLeft: 5,
    height: '2em',
    width: '2em',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  },
  wood: {
    backgroundImage: `url("${imageLinks.resources.wood}")`,
  },
  clay: {
    backgroundImage: `url("${imageLinks.resources.clay}")`,
  },
  iron: {
    backgroundImage: `url("${imageLinks.resources.iron}")`,
    backgroundSize: 'contain',
  },
  crop: {
    backgroundImage: `url("${imageLinks.resources.crop}")`,
    backgroundSize: 'contain',
  },
  total: {
    backgroundImage: `url("${imageLinks.resources.total}")`,
  },
  freeCrop: {
    backgroundImage: `url("${imageLinks.resources.freeCrop}")`,
  },
  buildTime: {
    backgroundImage: `url("${imageLinks.cost.buildTime}")`,
  },
});

export const Cost: React.FC<IProps> = (props) => {
  const {
    className,
    cost: {
      resources,
      buildTime,
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
    <div className={classNames(className, classes.root)}>
      <span className={classNames(classes.image, classes.wood)} />
      <span className={classes.value}>{formatResources(resources.wood)}</span>

      <span className={classNames(classes.image, classes.clay)} />
      <span className={classes.value}>{formatResources(resources.clay)}</span>

      <span className={classNames(classes.image, classes.iron)} />
      <span className={classes.value}>{formatResources(resources.iron)}</span>

      <span className={classNames(classes.image, classes.crop)} />
      <span className={classes.value}>{formatResources(resources.crop)}</span>

      <span className={classNames(classes.image, classes.total)} />
      <span className={classes.value}>{formatTotal(totalResources)}</span>

      <span className={classNames(classes.image, classes.freeCrop)}/>
      <span className={classes.value}>{formatFreeCrop(resources.freeCrop)}</span>

      <span className={classNames(classes.image, classes.buildTime)}/>
      <span className={classes.value}>{time}</span>
    </div>
  );
};
