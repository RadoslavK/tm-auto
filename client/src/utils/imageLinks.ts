import { backend } from '../constants/backend';

const baseUrl = `${backend.url}/images`;

export const imageLinks = {
  getBuilding: (buildingType: number): string => `${baseUrl}/buildings/${buildingType}.png`,

  resources: {
    wood: `${baseUrl}/resources/wood.png`,
    clay: `${baseUrl}/resources/clay.png`,
    iron: `${baseUrl}/resources/iron.png`,
    crop: `${baseUrl}/resources/crop.png`,
    total: `${baseUrl}/resources/total.png`,
    freeCrop: `${baseUrl}/resources/free_crop.png`,
  },

  cost: {
    resources: this.resources,
    buildTime: `${baseUrl}/resources/time.png`,
  },

  actions: {
    delete: `${baseUrl}/red_cross.png`,
    queue: {
      moveUp: `${baseUrl}/arrow_up.png`,
      moveDown: `${baseUrl}/arrow_down.png`,
    },
  },
};


