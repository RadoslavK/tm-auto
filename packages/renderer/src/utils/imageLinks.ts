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

  getBuilding: (
    buildingType: number,
    size: BuildingImageSize = BuildingImageSize.Normal,
  ): string => {
    if (size === BuildingImageSize.Normal) {
      return `${baseUrl}/buildings/${buildingType}.png`;
    }

    return `${baseUrl}/buildings/small/${buildingType}.png`;
  },

  getUnit: (unitIndex: number): string => `${baseUrl}/units/u${unitIndex}.gif`,

  resources,
};