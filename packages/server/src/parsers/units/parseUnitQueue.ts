import { Duration } from '../../_models/duration.js';
import { UnitsQueue } from '../../_models/units/unitsQueue.js';
import { browserManager } from '../../browser/browserManager.js';

export const parseUnitQueue = async (): Promise<UnitsQueue> => {
  const page = await browserManager.getPage();
  const unitNodes = await page.$x(
    '//tr[.//*[@class="dur"]//*[@class="timer"]]',
  );

  const queuedUnits = await Promise.all(
    unitNodes.map(async (unitNode) => {
      const timerNode = await unitNode.$('[class=dur] [class=timer]');

      if (!timerNode) {
        throw new Error('Did not find timer node for unit');
      }

      const durationText = await timerNode.evaluate(
        (x) => (x as HTMLElement).innerText,
      );
      const duration = Duration.fromText(durationText);

      const unitIndex = await unitNode.$eval('img[class*=unit]', (x) => {
        const unitIndexClass = /unit u(\d+)/.exec(x.className);

        if (!unitIndexClass) {
          throw new Error('Failed to parse unit queue');
        }

        return +unitIndexClass[1];
      });

      const count = await unitNode.$eval('[class=desc]', (x) => {
        const text = (x as HTMLElement).innerText.trim();
        const unitCountMatch = /(\d+)/.exec(text);

        if (!unitCountMatch) {
          throw new Error('Failed to parse unit count');
        }

        return +unitCountMatch[1];
      });

      return {
        count,
        duration,
        unitIndex,
      };
    }),
  );

  const unitQueue = new UnitsQueue();

  if (!queuedUnits.length) {
    return unitQueue;
  }

  const lastUnit = queuedUnits[queuedUnits.length - 1];
  unitQueue.duration = lastUnit.duration;

  queuedUnits.forEach((unit) => unitQueue.add(unit.unitIndex, unit.count));

  return unitQueue;
};
