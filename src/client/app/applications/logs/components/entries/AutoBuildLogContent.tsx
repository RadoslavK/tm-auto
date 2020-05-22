import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

import { IAutoBuildLogEntryContentPayload } from '../../../../../_types/graphql';
import { imageLinks } from '../../../../../utils/imageLinks';

type StylesProps = {
  readonly buildingType: number;
};

const useStyles = makeStyles<unknown, StylesProps>({
  image: props => ({
    backgroundImage: `url("${imageLinks.getBuilding(props.buildingType)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '18px',
    width: '18px',
  }),
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
});

type Props = {
  readonly className?: string;
  readonly content: IAutoBuildLogEntryContentPayload;
};

export const AutoBuildLogContent: React.FC<Props> = ({ className, content }) => {
  const classes = useStyles({
    buildingType: content.type,
  });

  return (
    <div className={clsx(className, classes.root)}>
      <span>
        Building
      </span>
      <div className={classes.image} />
      <span>
        {content.name}
        {' '}
        to level
        {content.level}
        {' '}
        at field
        {content.fieldId}
      </span>
    </div>
  );
};