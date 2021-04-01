import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useLazyLoadQuery,
  useSubscription,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';
import { BuildingType } from 'shared/enums/BuildingType.js';

import type { CrannyCapacityQuery } from '../../../_graphql/__generated__/CrannyCapacityQuery.graphql.js';
import type { CrannyCapacitySubscription } from '../../../_graphql/__generated__/CrannyCapacitySubscription.graphql.js';
import { tribeState } from '../../../_recoil/atoms/tribe.js';
import { imageLinks } from '../../../utils/imageLinks.js';

type StylesProps = {
  readonly tribe: string;
};

const useStyles = makeStyles<unknown, StylesProps>({
  image: {
    backgroundImage: props => `url("${imageLinks.getBuilding(BuildingType.Cranny, props.tribe)}")`,
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

const subscription = graphql`
    subscription CrannyCapacitySubscription($villageId: ID!) {
        onCrannyCapacityUpdated(villageId: $villageId) {
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
  const tribe = useRecoilValue(tribeState);
  const classes = useStyles({ tribe });

  const { crannyCapacity } = useLazyLoadQuery<CrannyCapacityQuery>(crannyCapacityQuery, { villageId });

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<CrannyCapacitySubscription> => ({
    subscription,
    variables: { villageId },
    updater: (store) => {
      const newRecord = store.getRootField('onCrannyCapacityUpdated');
      store.getRoot().setLinkedRecord(newRecord, 'crannyCapacity', { villageId });
    },
  }), [villageId]);

  useSubscription(subscriptionConfig);

  return (
    <div className={classes.root}>
      <div className={classes.image} />
      <div>
        {crannyCapacity.actual} /{crannyCapacity.ongoing} /{crannyCapacity.total}
      </div>
    </div>
  );
};
