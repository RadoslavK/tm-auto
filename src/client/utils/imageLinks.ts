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
  getBuilding: (buildingType: number): string => `${baseUrl}/buildings/${buildingType}.png`,

  getUnit: (tribe: number, index: number): string => `${baseUrl}/units/${tribe}/u${(tribe - 1) * 10 + index}.gif`,

  resources,

  cost: {
    resources,
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


