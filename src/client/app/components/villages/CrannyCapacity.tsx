import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';
import React from 'react';

import {
  CrannyCapacity as CrannyCapacityQuery,
  CrannyCapacityChanged,
} from '*/graphql_operations/village.graphql';

import {
  ICrannyCapacityChangedSubscription,
  ICrannyCapacityChangedSubscriptionVariables,
  ICrannyCapacityQuery,
  ICrannyCapacityQueryVariables,
  IVillageCrannyCapacity,
} from '../../../_types/graphql';
import { BuildingType } from '../../../../_shared/types/buildingType';
import { imageLinks } from '../../../utils/imageLinks';
import { useVillageContext } from '../../hooks/useVillageContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  image: {
    width: 24,
    height: 24,
    backgroundImage: `url("${imageLinks.getBuilding(BuildingType.Cranny)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  },
});

const useCrannyCapacity = (): IVillageCrannyCapacity | undefined => {
  const { villageId } = useVillageContext();

  const crannyCapacityResult = useQuery<ICrannyCapacityQuery, ICrannyCapacityQueryVariables>(CrannyCapacityQuery, {
    variables: { villageId },
  });

  useSubscription<ICrannyCapacityChangedSubscription, ICrannyCapacityChangedSubscriptionVariables>(CrannyCapacityChanged, {
    variables: { villageId },
    onSubscriptionData: () => {
      crannyCapacityResult.refetch();
    },
  });

  return !crannyCapacityResult.loading && crannyCapacityResult.data
    ? crannyCapacityResult.data.crannyCapacity
    : undefined;
};

export const CrannyCapacity: React.FC = () => {
  const capacity = useCrannyCapacity();
  const classes = useStyles();

  if (!capacity) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.image} />
      <div>{capacity.actual} / {capacity.ongoing} / {capacity.total}</div>
    </div>
  );
};
