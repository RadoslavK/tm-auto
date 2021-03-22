import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';

import type { Resources_villageResources$key } from '../../../_graphql/__generated__/Resources_villageResources.graphql.js';
import { createFormatter } from '../../../utils/numberFormatting.js';
import { Resource } from './Resource.js';

const useStyles = makeStyles({
  root: {
    '&>*': {
      marginLeft: '3em',
    },
    'marginBottom': '1.5em',
  },
});

type Props = {
  readonly resources: Resources_villageResources$key;
};

const resourcesVillageResourcesFragment = graphql`
  fragment Resources_villageResources on VillageResources {
      amount {
          wood
          clay
          iron
          crop
          freeCrop
          total
      }
      capacity {
          granary
          warehouse
      }
      production {
          wood
          clay
          iron
          crop
      }
  }
`;

export const Resources: React.FC<Props> = ({ resources }) => {
  const resourcesFragment = useFragment(resourcesVillageResourcesFragment, resources);
  const {
    amount,
    capacity,
    production,
  } = resourcesFragment;

  const classes = useStyles();
  const totalCapacity = capacity.granary + capacity.warehouse * 3;

  const resourceFormatter = createFormatter(
    Math.max(amount.wood, amount.clay, amount.iron, amount.crop),
  );
  const capacityFormatter = createFormatter(
    Math.max(capacity.granary, capacity.warehouse),
  );
  const totalAmount = amount.total;

  return (
    <div className={classes.root}>
      <Resource
        amount={amount.wood}
        capacity={capacity.warehouse}
        capacityFormatter={capacityFormatter}
        production={production.wood}
        resourceFormatter={resourceFormatter}
        resourceName="wood"
      />
      <Resource
        amount={amount.clay}
        capacity={capacity.warehouse}
        capacityFormatter={capacityFormatter}
        production={production.clay}
        resourceFormatter={resourceFormatter}
        resourceName="clay"
      />
      <Resource
        amount={amount.iron}
        capacity={capacity.warehouse}
        capacityFormatter={capacityFormatter}
        production={production.iron}
        resourceFormatter={resourceFormatter}
        resourceName="iron"
      />
      <Resource
        amount={amount.crop}
        capacity={capacity.granary}
        capacityFormatter={capacityFormatter}
        production={production.crop}
        resourceFormatter={resourceFormatter}
        resourceName="crop"
      />
      <Resource
        amount={totalAmount}
        capacity={totalCapacity}
        capacityFormatter={capacityFormatter}
        resourceName="total"
      />
      <Resource amount={amount.freeCrop} resourceName="freeCrop" />
    </div>
  );
};
