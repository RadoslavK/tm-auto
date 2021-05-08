import { Village } from '../../_models/village/village.js';
import { browserManager } from '../../browser/browserManager.js';

type ParsedVillage = {
  readonly id: string;
  readonly name: string;
  readonly x: number;
  readonly y: number;
}

export const parseVillages = async (): Promise<readonly Village[]> => {
  const page = await browserManager.getPage();

  const villages = await page.$$eval('.coordinatesGrid', nodes => nodes.map((node): ParsedVillage => {
    const name = node.getAttribute('data-villagename');
    const id = node.getAttribute('data-did');
    const x = node.getAttribute('data-x');
    const y = node.getAttribute('data-y');

    if (!name || !id || !x || !y) {
      throw new Error('Failed to parse village');
    }

    return {
      id,
      name,
      x: +x,
      y: +y,
    };
  }));

  return villages.map(village => new Village({
    id: village.id,
    name: village.name,
    coords: {
      x: village.x,
      y: village.y,
    },
  }));
};
