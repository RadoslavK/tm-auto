import { makeStyles } from '@material-ui/core';
import React from 'react';
import { capitalizeFirstLetter } from 'shared/utils/stringUtils.js';

import { imageLinks } from '../../../utils/imageLinks.js';
import { defaultFormatter } from '../../../utils/numberFormatting.js';

type ResourceName = keyof typeof imageLinks.resources;

type StylesProps = {
  readonly production: number | undefined;
  readonly resourceName: ResourceName;
};

const useStyles = makeStyles<unknown, StylesProps>({
  amount: {
    '&::after': { content: '"/"' },
  },
  image: (props) => ({
    backgroundImage: `url("${imageLinks.resources[props.resourceName]}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
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
        '&::before': { content: '"+"' },
        'color': 'green',
      };
    }

    return {};
  },
  root: {
    display: 'inline-flex',
  },
});

type Props = {
  readonly amount: number;
  readonly capacity?: number;
  readonly capacityFormatter?: (amount: number) => string;
  readonly production?: number;
  readonly resourceFormatter?: (amount: number) => string;
  readonly resourceName: ResourceName;
};



export const Resource: React.FC<Props> = ({
  amount,
  capacity,
  capacityFormatter = defaultFormatter,
  production,
  resourceFormatter = defaultFormatter,
  resourceName,
}) => {
  const classes = useStyles({ production, resourceName });

  return (
    <span className={classes.root}>
      <span className={classes.image} title={capitalizeFirstLetter(resourceName)} />
      <span title={String(amount)}>{resourceFormatter(amount)}</span>
      {capacity !== undefined && <span title={String(capacity)}>/{capacityFormatter(capacity)}</span>}
      {production !== undefined && (
        <span className={classes.production} title={String(production)}>
          {defaultFormatter(production)}
        </span>
      )}
    </span>
  );
};

Resource.displayName = 'Resource';