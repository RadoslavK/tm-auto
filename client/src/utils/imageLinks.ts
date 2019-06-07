import { backend } from '../constants/backend';

const baseUrl = `${backend.url}/images`;

export const imageLinks = {
  getBuilding: (buildingType: number): string => `${baseUrl}/buildings/${buildingType}.png`,

  resources: {
    wood: `${baseUrl}/resources/wood.png`,
    clay: `${baseUrl}/resources/clay.png`,
    iron: `${baseUrl}/resources/iron.png`,
    crop: `${baseUrl}/resources/crop.png`,
    freeCrop: `${baseUrl}/resources/free_crop.png`,
    total: `${baseUrl}/resources/total.png`,
  },

  time: `${baseUrl}/resources/time.png`,
};


