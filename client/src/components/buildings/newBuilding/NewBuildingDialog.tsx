import { GetAvailableNewBuildings } from '*/graphql_operations/building.graphql';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import {
  IGetAvailableNewBuildingsQuery,
  IGetAvailableNewBuildingsQueryVariables,
} from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';
import { NewBuildingItem } from './NewBuildingItem';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

interface IProps {
  readonly fieldId: number;
  readonly onSelect: () => void;
}

const propTypes: PropTypesShape<IProps> = {
  fieldId: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const NewBuildingDialog: React.FunctionComponent<IProps> = React.forwardRef((props, ref: any) => {
  const {
    fieldId,
    onSelect,
  } = props;

  const classes = useStyles({});
  const { villageId } = useContext<IVillageContext>(VillageContext);
  const { data, loading } = useQuery<IGetAvailableNewBuildingsQuery, IGetAvailableNewBuildingsQueryVariables>(GetAvailableNewBuildings, {
    variables: { input: { fieldId, villageId } },
    fetchPolicy: 'network-only',
  });

  if (loading) {
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
          building={building}
          fieldId={fieldId}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
});

NewBuildingDialog.propTypes = propTypes;
NewBuildingDialog.displayName = 'NewBuildingDialog';

export { NewBuildingDialog };
