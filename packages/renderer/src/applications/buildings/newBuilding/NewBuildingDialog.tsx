import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { NewBuildingDialogAvailableNewBuildingsTypesQuery } from '../../../_graphql/__generated__/NewBuildingDialogAvailableNewBuildingsTypesQuery.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
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
};

const newBuildingDialogAvailableNewBuildingsTypes = graphql`
  query NewBuildingDialogAvailableNewBuildingsTypesQuery($input: AvailableNewBuildingsInput!) {
      availableNewBuildingsTypes(input: $input)
  }
`;

export const NewBuildingDialog: React.FC<Props> = React.forwardRef(
  (props, ref: any) => {
    const { fieldId, onSelect } = props;

    const classes = useStyles({});
    const villageId = useRecoilValue(selectedVillageIdState);
    const { availableNewBuildingsTypes } = useLazyLoadQuery<NewBuildingDialogAvailableNewBuildingsTypesQuery>(
      newBuildingDialogAvailableNewBuildingsTypes,
      {
        input: { fieldId, villageId },
      },
      {
        fetchPolicy: 'network-only',
      },
    );

    return (
      <div ref={ref} className={classes.root}>
        {availableNewBuildingsTypes.map((buildingType) => (
          <NewBuildingDialogItem
            key={buildingType}
            className={classes.building}
            fieldId={fieldId}
            onSelect={onSelect}
            type={buildingType}
          />
        ))}
      </div>
    );
  },
);

NewBuildingDialog.displayName = 'NewBuildingDialog';