import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import { useGetAvailableNewBuildingTypesQuery } from '../../../_graphql/graphqlHooks';
import { useVillageContext } from '../../villages/context/villageContext';
import { NewBuildingItem } from './NewBuildingItem';

const useStyles = makeStyles({
  building: {
    marginLeft: 5,
    marginRight: 5,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

type Props = {
  readonly fieldId: number;
  readonly onSelect: () => void;
};

export const NewBuildingDialog: React.FC<Props> = React.forwardRef((props, ref: any) => {
  const {
    fieldId,
    onSelect,
  } = props;

  const classes = useStyles({});
  const { villageId } = useVillageContext();

  const { data, loading } = useGetAvailableNewBuildingTypesQuery({ variables: { input: { fieldId, villageId } } });

  if (loading || !data) {
    return null;
  }

  const {
    availableNewBuildingsTypes,
  } = data;

  return (
    <div
      ref={ref}
      className={classes.root}
    >
      {availableNewBuildingsTypes.map((buildingType) => (
        <NewBuildingItem
          key={buildingType}
          className={classes.building}
          fieldId={fieldId}
          onSelect={onSelect}
          type={buildingType}
        />
      ))}
    </div>
  );
});
