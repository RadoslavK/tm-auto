export const getSectorSize = (zoomLevel: number) => {
  switch (zoomLevel) {
    case 1:
      return { x: 11, y: 9 };
    case 2:
      return { x: 21, y: 17 };
    case 3:
      return { x: 31, y: 31 };

    default:
      throw new Error(`Invalid zoom level: ${zoomLevel}`);
  }
};
