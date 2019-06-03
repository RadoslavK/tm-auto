import React from 'react';
import { IBuilding } from '../../../../server/src/controller/models/buildings/building';
import { buildingNames } from '../../../../server/src/controller/constants/buildingNames';

interface IParams {
  readonly building: IBuilding;
}

export const Building: React.FunctionComponent<IParams> = (props) => {
  const {
    building,
  } = props;

  return (
    <div className="building">
      <span>{buildingNames[building.type]}</span>:
      <span className="building-actual-level">{building.level.actual}</span> +
      <span className="building-ongoing-level">{building.level.ongoing}</span>
    </div>
  );
};
