import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import { IVillageResources } from '../../../../_types/graphql';
import { createFormatter } from '../../../utils/numberFormatting';
import { getTotalResources } from '../../../utils/resources';
import { Resource } from './Resource';

const useStyles = makeStyles({
  root: {
    '&>*': {
      marginLeft: '3em',
    },
    marginBottom: '1.5em',
  },
});

type Props = {
  readonly resources: IVillageResources;
};

export const Resources: React.FC<Props> = ({
  resources: {
    amount,
    capacity,
    production,
  },
}) => {
  const classes = useStyles();
  const totalCapacity = capacity.granary + capacity.warehouse * 3;

  const resourceFormatter = createFormatter(Math.max(amount.wood, amount.clay, amount.iron, amount.crop));
  const capacityFormatter = createFormatter(Math.max(capacity.granary, capacity.warehouse));
  const totalAmount = getTotalResources(amount);

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
      <Resource
        amount={amount.freeCrop}
        resourceName="freeCrop"
      />
    </div>
  );
};
