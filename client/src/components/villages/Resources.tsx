import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { IVillageResources } from '../../_types/graphql';
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

export const Resources: React.FunctionComponent<IProps> = (props) => {
  const {
    resources: {
      amount,
      capacity,
      production,
    },
  } = props;

  const totalCapacity = capacity.granary + capacity.warehouse;
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <Resource resourceName="wood" amount={amount.wood} capacity={capacity.warehouse} production={production.wood}/>
      <Resource resourceName="clay" amount={amount.clay} capacity={capacity.warehouse} production={production.clay}/>
      <Resource resourceName="iron" amount={amount.iron} capacity={capacity.warehouse} production={production.iron}/>
      <Resource resourceName="crop" amount={amount.crop} capacity={capacity.granary} production={production.crop}/>
      <Resource resourceName="total" amount={amount.total} capacity={totalCapacity} />
      <Resource resourceName="freeCrop" amount={amount.freeCrop} />
    </div>
  );
};
