import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import { imageLinks } from '../../../utils/imageLinks';
import { createFormatter } from '../../utils/numberFormatting';

type ResourceName = keyof typeof imageLinks.resources;

interface IProps {
  readonly amount: number;
  readonly capacity?: number;
  readonly production?: number;
  readonly resourceName: ResourceName;
  readonly resourceFormatter?: (amount: number) => string;
  readonly capacityFormatter?: (amount: number) => string;
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
    resourceFormatter,
    capacityFormatter,
  } = props;

  const classes = useStyles({ production, resourceName });
  const formatResources = resourceFormatter || createFormatter();
  const formatCapacity = capacityFormatter || createFormatter();

  return (
    <span className={classes.root}>
      <span className={classes.image} />
      <span>{formatResources(amount)}</span>
      {capacity !== undefined && (
        <span>/{formatCapacity(capacity)}</span>
      )}
      {production !== undefined && (
        <>
          (<span className={classes.production}>{createFormatter()(production)}</span>)
        </>
      )}
    </span>
  );
};
