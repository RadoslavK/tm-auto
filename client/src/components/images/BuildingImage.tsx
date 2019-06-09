import React from 'react';
import { imageLinks } from '../../utils/imageLinks';

interface IProps {
  readonly buildingType: number;
  readonly className?: string;
}

export const BuildingImage: React.FunctionComponent<IProps> = (props) => {
  const {
    buildingType,
    className,
  } = props;

  return (
    <img src={imageLinks.getBuilding(buildingType)} className={className} />
  )
};
