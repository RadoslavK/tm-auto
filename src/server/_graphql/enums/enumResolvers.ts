import { Resolvers } from '../../_types/resolvers.type';
import { getAllEnumValues } from '../../../_shared/enumUtils';
import { BuildingType } from '../../../_shared/types/buildingType';
import { Tribe } from '../../../_shared/types/tribe';

type EnumType = {
  [index: string]: string | number,
};

const mapInternalValues = (enumDefinition: EnumType) => getAllEnumValues(enumDefinition)
  .reduce((reduced, enumValue) => ({
    ...reduced,
    [enumDefinition[enumValue]]: enumValue,
  }), {});

export default <Resolvers> {
  BuildingType: mapInternalValues(BuildingType),
  Tribe: mapInternalValues(Tribe),
};