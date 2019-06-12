import { Village } from '../../_models/village/village';
import { getPage } from '../../browser/getPage';

export const parseVillages = async (): Promise<readonly Village[]> => {
  const page = await getPage();
  const villageNodes = await page.$$('#sidebarBoxVillagelist [href*=newdid]');

  const villages = villageNodes.map(async (villageNode) => {
    const link = await villageNode.getProperty('href').then(x => x.jsonValue());
    const idMatch = /newdid=(\d+)/.exec(link);
    const id = +idMatch[1];

    const name = await villageNode.$eval('[class=name]', x => (<HTMLElement>x).innerText);

    const xText = await villageNode.$eval('[class=coordinateX]', x => (<HTMLElement>x).innerText);
    const yText = await villageNode.$eval('[class=coordinateY]', x => (<HTMLElement>x).innerText);

    const xMatch = /(\d+)/.exec(xText);
    const yMatch = /(\d+)/.exec(yText);

    const x = +xMatch[1];
    const y = +yMatch[1];

    return new Village({
      id,
      name,
      coords: { x, y },
    })
  });

  return Promise.all(villages);
};
