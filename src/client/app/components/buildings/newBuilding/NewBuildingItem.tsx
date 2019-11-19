import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { useEnqueueBuildingMutation } from '../../../hooks/useEnqueueBuildingMutation';
import { imageLinks } from '../../../../utils/imageLinks';

interface IProps {
  readonly className?: string;
  readonly name: string;
  readonly type: number,
  readonly fieldId: number;
  readonly onSelect: () => void;
}

const useStyles = makeStyles<unknown, IProps>({
  image: props => ({
    width: 96,
    height: 96,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("${imageLinks.getBuilding(props.type)}")`,
  }),
  name: {
    textAlign: 'center',
  },
});

export const NewBuildingItem: React.FC<IProps> = (props) => {
  const {
    className,
    name,
    type,
    fieldId,
    onSelect,
  } = props;

  const [enqueue] = useEnqueueBuildingMutation({ buildingType: type, fieldId });
  const classes = useStyles(props);

  const onClick = async (): Promise<void> => {
    await enqueue();

    onSelect();
  };

  return (
    <div className={className} onClick={onClick}>
      <div className={classes.image} />
      <span className={classes.name}>{name}</span>
    </div>
  )
};