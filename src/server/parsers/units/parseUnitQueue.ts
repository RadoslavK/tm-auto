import { UnitsQueue } from '../../_models/units/unitsQueue';
import { getPage } from '../../browser/getPage';
import { getSecondsFromString } from '../../utils/getSeconds';
import { accountContext } from '../../accountContext';

export const parseUnitQueue = async (): Promise<UnitsQueue> => {
  const page = await getPage();
  const queuedUnitNodes = await page.$$('tr [class=dur] [class=timer]');
  const unitQueue = new UnitsQueue();

  if (!queuedUnitNodes.length) {
    return unitQueue;
  }

  const lastUnitNode = queuedUnitNodes[queuedUnitNodes.length - 1];
  unitQueue.duration = await lastUnitNode.$eval('[class=timer]', x => getSecondsFromString((x as HTMLElement).innerText));

  const unitIndexDecrement = (accountContext.gameInfo.tribe - 1) * 10;

  const units = await Promise.all(queuedUnitNodes.map(async (node) => {
    const index = await node.$eval('img[class*=unit]', x => {
      const unitIndexClass = /unit u(\d+)/.exec(x.className);

      if (!unitIndexClass) {
        throw new Error('Failed to parse unit queue');
      }

      const unitIndex = +unitIndexClass[1];
      return unitIndex - unitIndexDecrement;
    });

    const count = await node.$eval('[class=desc]', x => {
      const text = (x as HTMLElement).innerText.trim();
      const unitCountMatch = /(\d+)/.exec(text);

      if (!unitCountMatch) {
        throw new Error('Failed to parse unit queue');
      }

      return +unitCountMatch[1];
    });

    return {
      index,
      count,
    };
  }));

  units.forEach(unit => unitQueue.add(unit.index, unit.count));

  return unitQueue;
};
