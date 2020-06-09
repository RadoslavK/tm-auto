import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';

import { imageLinks } from '../../../../utils/imageLinks';

const useStyles = makeStyles({
  expand: {
    backgroundImage: `url("${imageLinks.actions.expand}")`,
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '2em',
    width: '2em',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

type Props = {
  readonly className?: string;
  readonly onExpand?: () => void;
};

export const QueuedBuildingRangeActions: React.FC<Props> = (props) => {
  const {
    className,
    onExpand,
  } = props;

  const classes = useStyles();

  return (
    <div className={clsx(className, classes.root)}>
      {onExpand && (
        <button
          className={clsx(classes.image, classes.expand)}
          onClick={onExpand}
        />
      )}
    </div>
  );
};
