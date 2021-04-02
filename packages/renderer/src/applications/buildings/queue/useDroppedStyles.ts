import { makeStyles } from '@material-ui/core';

type StylesProps = {
  readonly canBeMoved: boolean | undefined;
};

export const useDroppedStyles = makeStyles<unknown, StylesProps>({
  buildingPlaceholder: {
    backgroundColor: (props) => props.canBeMoved === undefined ? undefined : (props.canBeMoved ? 'green' : 'red'),
  },
});