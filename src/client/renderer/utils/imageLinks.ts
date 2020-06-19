import { BuildingType } from '../../../_shared/types/buildingType';

export enum BuildingImageSize {
  Small,
  Normal,
}

const baseUrl = 'images';

const resources = {
  clay: `${baseUrl}/resources/clay.png`,
  crop: `${baseUrl}/resources/crop.png`,
  freeCrop: `${baseUrl}/resources/free_crop.png`,
  iron: `${baseUrl}/resources/iron.png`,
  total: `${baseUrl}/resources/total.png`,
  wood: `${baseUrl}/resources/wood.png`,
};

const isEnumKey = (buildingType: BuildingType | keyof BuildingType): buildingType is BuildingType =>
  typeof buildingType === 'string';

export const imageLinks = {
  actions: {
    collapse: `${baseUrl}/collapse.png`,
    delete: `${baseUrl}/red_cross.png`,
    expand: `${baseUrl}/expand.png`,
    queue: {
      moveToTop: `${baseUrl}/double_arrow_up.png`,
    },
  },

  cost: {
    buildTime: `${baseUrl}/resources/time.png`,
    resources,
  },

  getBuilding: (buildingType: BuildingType | keyof BuildingType, size: BuildingImageSize = BuildingImageSize.Normal): string => {
    // these enums are string enums for GraphQL
    const numberValue = isEnumKey(buildingType) ? BuildingType[buildingType] : buildingType;

    if (size === BuildingImageSize.Normal) {
      return `${baseUrl}/buildings/${numberValue}.png`;
    }

    return `${baseUrl}/buildings/small/${numberValue}.png`;
  },

  getUnit: (unitIndex: number): string => `${baseUrl}/units/u${unitIndex}.gif`,

  resources,
};
