import { getPage } from '../browser/getPage';

interface IBuildingResult {
  readonly type: number;
  readonly fieldId: number;
  readonly level: number;
}

export interface IOngoingQueueResult {
  readonly buildings: readonly IBuildingResult[];
}

export const parseOngoingQueue = async (): Promise<IOngoingQueueResult> => {
  const page = await getPage();

  const content = await page.$eval('#content', content => content.innerHTML);
  const buildings = [];

  let match;
  const re = /{"stufe":(.*),"gid":"(.*)","aid":"(.*)"}/g;

  do {
    match = re.exec(content);

    if (match) {
      const level = +match[1];
      const type = +match[2];
      const fieldId = +match[3];

      buildings.push({
        fieldId,
        level,
        type
      });
    }
  } while (match);

  return {
    buildings,
  }
};
