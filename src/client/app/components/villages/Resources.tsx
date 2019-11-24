import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { IVillageResources } from '../../../_types/graphql';
import { Resource } from './Resource';
import { createFormatter } from '../../utils/numberFormatting';

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

  return (
    <div className={classes.root}>
      <Resource resourceName="wood" amount={amount.wood} capacity={capacity.warehouse} production={production.wood} resourceFormatter={resourceFormatter} />
      <Resource resourceName="clay" amount={amount.clay} capacity={capacity.warehouse} production={production.clay} resourceFormatter={resourceFormatter} />
      <Resource resourceName="iron" amount={amount.iron} capacity={capacity.warehouse} production={production.iron} resourceFormatter={resourceFormatter} />
      <Resource resourceName="crop" amount={amount.crop} capacity={capacity.granary} production={production.crop} resourceFormatter={resourceFormatter} />
      <Resource resourceName="total"  amount={amount.total} capacity={totalCapacity} />
      <Resource resourceName="freeCrop" amount={amount.freeCrop} />
    </div>
  );
};
