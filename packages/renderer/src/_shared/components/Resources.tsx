import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React from 'react';
import { useFragment } from 'react-relay/hooks';

import type { Resources_resources$key } from '../../_graphql/__generated__/Resources_resources.graphql.js';
import { imageLinks } from '../../utils/imageLinks.js';
import { createFormatter } from '../../utils/numberFormatting.js';

const useStyles = makeStyles({
  root: {
    display: 'flex',
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

const fragmentDefinition = graphql`
  fragment Resources_resources on Resources {
      wood
      clay
      iron
      crop
      freeCrop
      total
  }
`;

type Props = {
  readonly resourcesKey: Resources_resources$key;
  readonly showFreeCrop?: boolean;
};

export const Resources: React.FC<Props> = ({
  resourcesKey,
  showFreeCrop,
}) => {
  const classes = useStyles();
  const resourcesFragment = useFragment(fragmentDefinition, resourcesKey);

  const highestResource = Math.max(
    resourcesFragment.wood,
    resourcesFragment.clay,
    resourcesFragment.iron,
    resourcesFragment.crop,
  );
  const formatResources = createFormatter(highestResource);
  const formatTotal = createFormatter();
  const formatFreeCrop = createFormatter();

  return (
    <div className={classes.root}>
      <span className={clsx(classes.image, classes.wood)} />
      <span className={classes.value}>{formatResources(resourcesFragment.wood)}</span>
      <span className={clsx(classes.image, classes.clay)} />
      <span className={classes.value}>{formatResources(resourcesFragment.clay)}</span>
      <span className={clsx(classes.image, classes.iron)} />
      <span className={classes.value}>{formatResources(resourcesFragment.iron)}</span>
      <span className={clsx(classes.image, classes.crop)} />
      <span className={classes.value}>{formatResources(resourcesFragment.crop)}</span>
      <span className={clsx(classes.image, classes.total)} />
      <span className={classes.value}>{formatTotal(resourcesFragment.total)}</span>
      {showFreeCrop !== false && (
        <>
          <span className={clsx(classes.image, classes.freeCrop)} />
          <span className={classes.value}>
            {formatFreeCrop(resourcesFragment.freeCrop)}
          </span>
        </>
      )}
    </div>
  );
};

Resources.displayName = 'Resources';