import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { imageLinks } from '../../../utils/imageLinks';

type ResourceName = 'wood' | 'clay' | 'iron' | 'crop' | 'total' | 'freeCrop';

interface IProps {
  readonly amount: number;
  readonly capacity?: number;
  readonly production?: number;
  readonly resourceName: ResourceName;
}

interface IStyleProps {
  readonly production: number | undefined;
  readonly resourceName: ResourceName;
}

const useStyles = makeStyles<unknown, IStyleProps>({
  root: {
    display: 'inline-flex',
  },
  amount: {
    '&::after': { content: '"/"' },
  },
  image: props => ({
    backgroundImage: `url("${imageLinks.resources[props.resourceName]}")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: '2em',
    width: '2em',
  }),
  production: ({ production }) => {
    if (!production) {
      return {};
    }

    if (production < 0) {
      return {
        color: 'red',
      };
    }

    if (production > 0) {
      return {
        color: 'green',
        '&::before': { content: '"+"' },
      };
    }

    return {};
  },
});

export const Resource: React.FC<IProps> = (props) => {
  const {
    amount,
    capacity,
    production,
    resourceName,
  } = props;

  const classes = useStyles({ production, resourceName });

  return (
    <span className={classes.root}>
      <span className={classes.image} />
      <span>{amount}</span>
      {capacity !== undefined && (
        <span>/{capacity}</span>
      )}
      {production !== undefined && (
        <>
          (<span className={classes.production}>{production}</span>)
        </>
      )}
    </span>
  );
};
