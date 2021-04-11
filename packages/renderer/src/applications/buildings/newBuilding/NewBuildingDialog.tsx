import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';

import type { NewBuildingDialogAvailableNewBuildingsTypesQuery } from '../../../_graphql/__generated__/NewBuildingDialogAvailableNewBuildingsTypesQuery.graphql.js';
import { NewBuildingDialogItem } from './NewBuildingDialogItem.js';

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
  readonly queryRef: PreloadedQuery<NewBuildingDialogAvailableNewBuildingsTypesQuery>;
};

export const newBuildingDialogQuery = graphql`
  query NewBuildingDialogAvailableNewBuildingsTypesQuery($input: AvailableNewBuildingsInput!) {
      availableNewBuildings(input: $input) {
          type
          ...NewBuildingDialogItem_availableNewBuildingFragment
      }
  }
`;

export const NewBuildingDialog: React.FC<Props> = React.forwardRef(
  (props, ref: any) => {
    const { fieldId, onSelect, queryRef } = props;

    const classes = useStyles({});
    const { availableNewBuildings } = usePreloadedQuery(newBuildingDialogQuery, queryRef);

    return (
      <div ref={ref} className={classes.root}>
        {availableNewBuildings.map((availableNewBuilding) => (
          <NewBuildingDialogItem
            key={availableNewBuilding.type}
            className={classes.building}
            fieldId={fieldId}
            onSelect={onSelect}
            availableNewBuildingKey={availableNewBuilding}
          />
        ))}
      </div>
    );
  },
);

NewBuildingDialog.displayName = 'NewBuildingDialog';