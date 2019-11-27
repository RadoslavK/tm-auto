import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import { IVillageResources } from '../../../_types/graphql';
import { createFormatter } from '../../utils/numberFormatting';
import { getTotalResources } from '../../utils/resources';
import { Resource } from './Resource';

interface IProps {
  readonly resources: IVillageResources;
}

const useStyles = makeStyles({
  root: {
    marginBottom: '1.5em',
    '&>*': {
      marginLeft: '3em',
    },
  },
});

export const Resources: React.FC<IProps> = (props) => {
  const {
    resources: {
      amount,
      capacity,
      production,
    },
  } = props;

  const classes = useStyles({});
  const totalCapacity = capacity.granary + capacity.warehouse * 3;

  const resourceFormatter = createFormatter(Math.max(capacity.granary, capacity.warehouse, amount.wood, amount.clay, amount.iron, amount.crop));

  const totalAmount = getTotalResources(amount);

  return (
    <div className={classes.root}>
      <Resource resourceName="wood" amount={amount.wood} capacity={capacity.warehouse} production={production.wood} resourceFormatter={resourceFormatter} />
      <Resource resourceName="clay" amount={amount.clay} capacity={capacity.warehouse} production={production.clay} resourceFormatter={resourceFormatter} />
      <Resource resourceName="iron" amount={amount.iron} capacity={capacity.warehouse} production={production.iron} resourceFormatter={resourceFormatter} />
      <Resource resourceName="crop" amount={amount.crop} capacity={capacity.granary} production={production.crop} resourceFormatter={resourceFormatter} />
      <Resource resourceName="total" amount={totalAmount} capacity={totalCapacity} />
      <Resource resourceName="freeCrop" amount={amount.freeCrop} />
    </div>
  );
};
