import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import classNames from 'classnames';
import { formatTimeFromSeconds } from '../../../../../server/utils/formatTime';
import { ICost } from '../../../../_types/graphql';
import { imageLinks } from '../../../../utils/imageLinks';

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

const Cost: React.FunctionComponent<IProps> = (props) => {
  const {
    className,
    cost: {
      resources,
      buildTime,
    },
  } = props;

  const classes = useStyles({});
  const time = formatTimeFromSeconds(buildTime);

  return (
    <div className={classNames(className, classes.root)}>
      <span className={classNames(classes.image, classes.wood)} />
      <span className={classes.value}>{resources.wood}</span>

      <span className={classNames(classes.image, classes.clay)} />
      <span className={classes.value}>{resources.clay}</span>

      <span className={classNames(classes.image, classes.iron)} />
      <span className={classes.value}>{resources.iron}</span>

      <span className={classNames(classes.image, classes.crop)} />
      <span className={classes.value}>{resources.crop}</span>

      <span className={classNames(classes.image, classes.total)} />
      <span className={classes.value}>{resources.total}</span>

      <span className={classNames(classes.image, classes.freeCrop)}/>
      <span className={classes.value}>{resources.freeCrop}</span>

      <span className={classNames(classes.image, classes.buildTime)}/>
      <span className={classes.value}>{time}</span>
    </div>
  );
};

Cost.displayName = 'Cost';

export { Cost };
