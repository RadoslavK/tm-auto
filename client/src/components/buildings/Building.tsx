import React from 'react';
import { buildingNames } from '../../../../server/src/controller/constants/buildingNames';
import { GetVillageById_village_buildings } from '../villages/_types/GetVillageById';

interface IParams {
  readonly building: GetVillageById_village_buildings;
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
