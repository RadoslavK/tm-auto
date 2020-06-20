import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { BuildingType } from '../../../_graphql/graphqlHooks';
import { imageLinks } from '../../../utils/imageLinks';
import { useCrannyCapacity } from '../hooks/useCrannyCapacity';

const useStyles = makeStyles({
  image: {
    backgroundImage: `url("${imageLinks.getBuilding(BuildingType.Cranny)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 24,
    width: 24,
  },
  root: {
    display: 'flex',
  },
});

export const CrannyCapacity: React.FC = () => {
  const classes = useStyles();
  const capacity = useCrannyCapacity();

  if (!capacity) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.image} />
      <div>
        {capacity.actual} /{capacity.ongoing} /{capacity.total}
      </div>
    </div>
  );
};
