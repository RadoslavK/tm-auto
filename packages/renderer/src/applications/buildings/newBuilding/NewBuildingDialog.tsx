import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';

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
  readonly villageId: string;
};

const newBuildingDialogAvailableNewBuildingsTypes = graphql`
  query NewBuildingDialogAvailableNewBuildingsTypesQuery($input: AvailableNewBuildingsInput!) {
      availableNewBuildingsTypes(input: $input)
  }
`;

export const NewBuildingDialog: React.FC<Props> = React.forwardRef(
  (props, ref: any) => {
    const { fieldId, onSelect, villageId } = props;

    const classes = useStyles({});

    const { availableNewBuildingsTypes } = useLazyLoadQuery<NewBuildingDialogAvailableNewBuildingsTypesQuery>(newBuildingDialogAvailableNewBuildingsTypes, {
      input: { fieldId, villageId },
    });

    return (
      <div ref={ref} className={classes.root}>
        {availableNewBuildingsTypes.map((buildingType) => (
          <NewBuildingDialogItem
            key={buildingType}
            className={classes.building}
            fieldId={fieldId}
            onSelect={onSelect}
            type={buildingType}
            villageId={villageId}
          />
        ))}
      </div>
    );
  },
);
