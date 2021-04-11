import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useFragment,
  useSubscription,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';
import { BuildingType } from 'shared/enums/BuildingType.js';

import type { CrannyCapacity_crannyCapacity$key } from '../../../_graphql/__generated__/CrannyCapacity_crannyCapacity.graphql.js';
import type { CrannyCapacitySubscription } from '../../../_graphql/__generated__/CrannyCapacitySubscription.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
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

const fragmentDef = graphql`
    fragment CrannyCapacity_crannyCapacity on VillageCrannyCapacity {
        actual
        ongoing
        total
    }
`;

const subscription = graphql`
    subscription CrannyCapacitySubscription($villageId: ID!) {
        onCrannyCapacityUpdated(villageId: $villageId) {
            ...CrannyCapacity_crannyCapacity
        }
    }
`;

type Props = {
  readonly crannyCapacityKey: CrannyCapacity_crannyCapacity$key;
};

export const CrannyCapacity: React.FC<Props> = ({ crannyCapacityKey }) => {
  const tribe = useRecoilValue(tribeState);
  const classes = useStyles({ tribe });
  const villageId = useRecoilValue(selectedVillageIdState);
  const crannyCapacity = useFragment(fragmentDef, crannyCapacityKey);

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

CrannyCapacity.displayName = 'CrannyCapacity';