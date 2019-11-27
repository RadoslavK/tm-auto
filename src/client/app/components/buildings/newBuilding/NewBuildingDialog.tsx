import { useQuery } from '@apollo/react-hooks';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import { GetAvailableNewBuildings } from '*/graphql_operations/building.graphql';

import {
  IGetAvailableNewBuildingsQuery,
  IGetAvailableNewBuildingsQueryVariables,
} from '../../../../_types/graphql';
import { useVillageContext } from '../../../hooks/useVillageContext';
import { NewBuildingItem } from './NewBuildingItem';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  building: {
    marginLeft: 5,
    marginRight: 5,
  },
});

interface IProps {
  readonly fieldId: number;
  readonly onSelect: () => void;
}

export const NewBuildingDialog: React.FC<IProps> = React.forwardRef((props, ref: any) => {
  const {
    fieldId,
    onSelect,
  } = props;

  const classes = useStyles({});
  const { villageId } = useVillageContext();
  const { data, loading } = useQuery<IGetAvailableNewBuildingsQuery, IGetAvailableNewBuildingsQueryVariables>(GetAvailableNewBuildings, {
    variables: { input: { fieldId, villageId } },
  });

  if (loading || !data) {
    return null;
  }

  const {
    availableNewBuildings,
  } = data;

  return (
    <div className={classes.root} ref={ref}>
      {availableNewBuildings.map((building, index) => (
        <NewBuildingItem
          key={index}
          className={classes.building}
          name={building.name}
          type={building.type}
          fieldId={fieldId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
});
