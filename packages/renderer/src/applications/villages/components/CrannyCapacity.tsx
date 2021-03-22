import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { BuildingType } from 'shared/enums/BuildingType.js';

import type { CrannyCapacityQuery } from '../../../_graphql/__generated__/CrannyCapacityQuery.graphql.js';
import { imageLinks } from '../../../utils/imageLinks.js';

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

const crannyCapacityQuery = graphql`
    query CrannyCapacityQuery($villageId: ID!) {
        crannyCapacity(villageId: $villageId) {
            actual
            ongoing
            total
        }
    }
`;

type Props = {
  readonly villageId: string;
};

export const CrannyCapacity: React.FC<Props> = ({ villageId }) => {
  const { crannyCapacity } = useLazyLoadQuery<CrannyCapacityQuery>(crannyCapacityQuery, { villageId });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.image} />
      <div>
        {crannyCapacity.actual} /{crannyCapacity.ongoing} /{crannyCapacity.total}
      </div>
    </div>
  );
};
