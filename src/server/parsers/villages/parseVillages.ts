import { Village } from '../../_models/village/village';
import { getPage } from '../../browser/getPage';

export const parseVillages = async (): Promise<readonly Village[]> => {
  const page = await getPage();
  const villageNodes = await page.$$('#sidebarBoxVillagelist [href*=newdid]');

  const villages = await Promise.all(villageNodes.map(async (villageNode) => {
    const link = await villageNode.getProperty('href').then(x => x.jsonValue());
    const idMatch = /newdid=(\d+)/.exec(link);

    if (!idMatch) {
      throw new Error('Failed to parse village id');
    }

    const id = +idMatch[1];

    const name = await villageNode.$eval('[class=name]', x => (x as HTMLElement).innerText);

    const xText = await villageNode.$eval('[class=coordinateX]', x => (x as HTMLElement).innerText);
    const yText = await villageNode.$eval('[class=coordinateY]', x => (x as HTMLElement).innerText);

    const xMatch = /(\d+)/.exec(xText);
    const yMatch = /(\d+)/.exec(yText);

    if (!xMatch || !yMatch) {
      throw new Error('Failed to parse village coords');
    }

    const x = +xMatch[1];
    const y = +yMatch[1];

    return new Village({
      id,
      name,
      coords: { x, y },
    });
  }));

  return villages;
};
