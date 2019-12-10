import { BuildingType } from '../../_shared/types/buildingType';

const baseUrl = 'images';

const resources = {
  wood: `${baseUrl}/resources/wood.png`,
  clay: `${baseUrl}/resources/clay.png`,
  iron: `${baseUrl}/resources/iron.png`,
  crop: `${baseUrl}/resources/crop.png`,
  total: `${baseUrl}/resources/total.png`,
  freeCrop: `${baseUrl}/resources/free_crop.png`,
};

export const imageLinks = {
  getBuilding: (buildingType: BuildingType): string => `${baseUrl}/buildings/${buildingType}.png`,

  getUnit: (unitIndex: number): string => `${baseUrl}/units/u${unitIndex}.gif`,

  resources,

  cost: {
    resources,
    buildTime: `${baseUrl}/resources/time.png`,
  },

  actions: {
    delete: `${baseUrl}/red_cross.png`,
    queue: {
      moveToTop: `${baseUrl}/double_arrow_up.png`,
      moveUp: `${baseUrl}/arrow_up.png`,
      moveDown: `${baseUrl}/arrow_down.png`,
    },
  },
};
