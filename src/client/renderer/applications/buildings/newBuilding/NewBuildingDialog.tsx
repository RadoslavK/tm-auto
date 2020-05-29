import { useQuery } from '@apollo/react-hooks';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import { GetAvailableNewBuildings } from '*/graphql_operations/building.graphql';

import {
  GetAvailableNewBuildingsQuery,
  GetAvailableNewBuildingsQueryVariables,
} from '../../../_graphql/types/graphql.type';
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
  const { data, loading } = useQuery<GetAvailableNewBuildingsQuery, GetAvailableNewBuildingsQueryVariables>(GetAvailableNewBuildings, {
    variables: { input: { fieldId, villageId } },
  });

  if (loading || !data) {
    return null;
  }

  const {
    availableNewBuildings,
  } = data;

  return (
    <div
      ref={ref}
      className={classes.root}
    >
      {availableNewBuildings.map((building) => (
        <NewBuildingItem
          key={building.type}
          className={classes.building}
          fieldId={fieldId}
          name={building.name}
          onSelect={onSelect}
          type={building.type}
        />
      ))}
    </div>
  );
});
