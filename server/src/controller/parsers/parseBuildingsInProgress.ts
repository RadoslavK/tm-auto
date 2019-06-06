import { BuildingInProgress } from '../../_models/buildings/buildingInProgress';
import { getPage } from '../browser/getPage';

export const parseBuildingsInProgress = async (): Promise<readonly BuildingInProgress[]> => {
  const page = await getPage();

  const content = await page.$eval('#content', content => content.innerHTML);
  const buildings: BuildingInProgress[] = [];

  const timers: number[] = await page.$$eval('.buildingList .buildDuration .timer', e => e.map(timer => {
    const value = timer.getAttribute('value');
    return +value;
  }));

  let match;
  const re = /{"stufe":(.*),"gid":"(.*)","aid":"(.*)"}/g;

  do {
    match = re.exec(content);

    if (match) {
      const level = +match[1];
      const type = +match[2];
      const fieldId = +match[3];

      const building = new BuildingInProgress({
        level,
        fieldId,
        type,
        timer: timers[buildings.length],
      });

      buildings.push(building);
    }
  } while (match);

  return buildings;
};
