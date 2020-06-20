import { TravianPath } from '../../_enums/travianPath';
import { BuildingInProgress } from '../../_models/buildings/inProgress/buildingInProgress';
import { getPage } from '../../browser/getPage';
import { validateUrl } from '../../utils/validateUrl';

const acceptedUrls: readonly string[] = [
  TravianPath.ResourceFieldsOverview,
  TravianPath.InfrastructureOverview,
];

export const parseBuildingsInProgress = async (): Promise<
  readonly BuildingInProgress[]
> => {
  await validateUrl(acceptedUrls);

  const page = await getPage();
  const content = await page.$eval('#content', (x) => x.innerHTML);
  const buildings: BuildingInProgress[] = [];

  const timers: number[] = await page.$$eval(
    '.buildingList .buildDuration .timer',
    (e) =>
      e.map((timer) => {
        const value = timer.getAttribute('value');

        if (!value) {
          throw new Error('Failed to parse building progress timer');
        }

        return +value;
      }),
  );

  let match;
  const re = /{"stufe":(.*?),"gid":"(.*?)","aid":"(.*?)"}/g;

  do {
    match = re.exec(content);

    if (match) {
      const level = +match[1];
      const type = +match[2];
      const fieldId = +match[3];

      const timer = timers[buildings.length];
      const finishedAt = new Date();
      finishedAt.setSeconds(finishedAt.getSeconds() + timer);

      const building = new BuildingInProgress({
        fieldId,
        finishedAt,
        level,
        type,
      });

      buildings.push(building);
    }
  } while (match);

  return buildings;
};
