import React from 'react';
import { imageLinks } from '../../utils/imageLinks';

interface IProps {
  readonly buildingType: number;
}

export const BuildingImage: React.FunctionComponent<IProps> = (props) => {
  return (
    <img
      height="48 px"
      width="48 px"
      src={imageLinks.getBuilding(props.buildingType)}
    />
  )
};
