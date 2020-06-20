import { getAllEnumValues } from '../../../_shared/enumUtils';
import { BuildingType } from '../../_models/enums/buildingType';
import { Tribe } from '../../_models/enums/tribe';
import { Resolvers } from '../../_types/resolvers.type';

type EnumType = {
  [index: string]: string | number;
};

const mapInternalValues = (enumDefinition: EnumType) =>
  getAllEnumValues(enumDefinition).reduce(
    (reduced, enumValue) => ({
      ...reduced,
      [enumDefinition[enumValue]]: enumValue,
    }),
    {},
  );

export default <Resolvers>{
  BuildingType: mapInternalValues(BuildingType),
  Tribe: mapInternalValues(Tribe),
};
