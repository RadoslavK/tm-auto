import { BuildingType } from '../../_shared/types/buildingType';

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
    delete: `${baseUrl}/red_cross.png`,
    queue: {
      moveDown: `${baseUrl}/arrow_down.png`,
      moveToTop: `${baseUrl}/double_arrow_up.png`,
      moveUp: `${baseUrl}/arrow_up.png`,
    },
  },

  cost: {
    buildTime: `${baseUrl}/resources/time.png`,
    resources,
  },

  getBuilding: (buildingType: BuildingType): string => `${baseUrl}/buildings/${buildingType}.png`,

  getUnit: (unitIndex: number): string => `${baseUrl}/units/u${unitIndex}.gif`,

  resources,
};
