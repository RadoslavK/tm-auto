import React from 'react';
import { buildingNames } from '../../../../server/src/controller/constants/buildingNames';

interface IParams {
  readonly building: {
    readonly type: number;
    readonly level: {
      readonly actual: number;
      readonly ongoing: number;
    }
  };
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
