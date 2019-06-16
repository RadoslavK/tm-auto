import { UnitsQueue } from '../../_models/units/unitsQueue';
import { getPage } from '../../browser/getPage';
import { context } from '../../graphql/context';
import { getSecondsFromString } from '../../utils/getSeconds';

export const parseUnitQueue = async (): Promise<UnitsQueue> => {
  const page = await getPage();
  const queuedUnitNodes = await page.$$('tr [class=dur] [class=timer]');
  const unitQueue = new UnitsQueue();

  if (!queuedUnitNodes.length) {
    return unitQueue;
  }

  const lastUnitNode = queuedUnitNodes[queuedUnitNodes.length - 1];
  unitQueue.duration = await lastUnitNode.$eval('[class=timer]', x => getSecondsFromString((<HTMLElement>x).innerText));

  const unitIndexDecrement = (context.player.tribe - 1) * 10;

  const units = await Promise.all(queuedUnitNodes.map(async (node) => {
    const index = await node.$eval('img[class*=unit]', x => {
      const className = x.className;
      const unitIndex = +/unit u(\d+)/.exec(className)[1];
      return unitIndex - unitIndexDecrement;
    });

    const count = await node.$eval('[class=desc]', x => {
      const text = (<HTMLElement>x).innerText.trim();
      return +/(\d+)/.exec(text)[1];
    });

    return {
      index,
      count,
    };
  }));

  units.forEach(unit => unitQueue.add(unit.index, unit.count));

  return unitQueue;
};
