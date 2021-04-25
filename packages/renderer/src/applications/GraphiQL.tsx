import {
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import React from 'react';

import { imageLinks } from '../utils/imageLinks.js';

const useStyles = makeStyles({
  graphql: {
    backgroundImage: `url("${imageLinks.misc.graphql}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '2em',
    width: '2em',
    marginRight: 4,
    cursor: 'pointer',
  },
});

export const GraphiQL: React.FC = () => {
  const classes = useStyles();
  const openGraphiQL = () => window.api.openGraphiQL();

  return (
    <Tooltip title="Open GraphiQL">
      <div
        className={classes.graphql}
        onClick={openGraphiQL}
      />
    </Tooltip>
  );
};

GraphiQL.displayName = 'OpenGraphiQL';