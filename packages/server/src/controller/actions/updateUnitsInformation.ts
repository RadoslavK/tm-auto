import type { ElementHandle } from 'puppeteer-core';
import { BuildingType } from 'shared/enums/BuildingType.js';

import { TravianPath } from '../../_enums/travianPath.js';
import { Coords } from '../../_models/coords.js';
import { AccountContext } from '../../accountContext.js';
import { browserManager } from '../../browser/browserManager.js';
import { parseActiveVillageId } from '../../parsers/villages/parseActiveVillageId.js';
import { parseNumber } from '../../utils/numberUtils.js';
import {
  ensureBuildingSpotPage,
  ensurePage,
} from './ensurePage.js';
import { ensureVillageSelected } from './ensureVillageSelected.js';

enum MovementType {
  Attack = 'Attack',
  InVillage = 'InVillage',
  Raid = 'Raid',
  Return = 'Return',
  Unknown = 'Unknown',
}

const mapMovementType = (movementClass: string | undefined): MovementType => {
  if (!movementClass) {
    return MovementType.InVillage;
  }

  switch (movementClass) {
    default:
      return MovementType.Unknown;
  }
};

type UnitAmount = {
  readonly amount: number;
  readonly unitIndex: number;
};

type TroopDetail = {
  readonly movementType: MovementType;
  readonly originVillageId: string;
  readonly unitAmounts: readonly UnitAmount[];
};

const parseCoordinate = async (
  elementHandle: ElementHandle,
  className: string,
): Promise<number | null> => {
  const coordElement = await elementHandle.$(className);

  if (!coordElement) {
    return null;
  }

  const coordText = await coordElement.evaluate(
    (x) => (x as HTMLElement).innerText,
  );
  return parseNumber(coordText);
};

const parseUnitAmounts = async (
  detailsHandle: ElementHandle,
): Promise<UnitAmount[]> => {
  const amounts = await detailsHandle.$$eval(
    'tbody[class="units last"] tr td',
    (countColumns) =>
      countColumns.map((column) => +(column as HTMLElement).innerText),
  );

  const indexes = await detailsHandle.$$eval(
    'tbody[class="units"] tr td.uniticon img',
    (icons) =>
      icons.map((icon) => {
        const heroIndexMatch = /unit uhero/.exec(icon.className);

        if (heroIndexMatch) {
          return null;
        }

        const unitIndexMatch = /unit u(\d+)/.exec(icon.className);

        if (!unitIndexMatch) {
          throw new Error('Could not parse unit index');
        }

        return +unitIndexMatch[1];
      }),
  );

  return indexes.reduce(
    (reduced, unitIndex, index) =>
      unitIndex
        ? [...reduced, { amount: amounts[index] || 0, unitIndex }]
        : reduced,
    [] as UnitAmount[],
  );
};

export const updateUnitsInformation = async (villageId: string): Promise<void> => {
  const village = AccountContext.getContext().villageService.village(villageId);

  const rallyPoint = village.buildings.spots.ofType(BuildingType.RallyPoint);

  if (!rallyPoint || !rallyPoint.isBuilt()) {
    return;
  }

  const now = Date.now();
  const checkCoolDown = 10 * 60 * 1000; //  10 min

  if (!AccountContext.plus
    || AccountContext.plus.isActive
    || AccountContext.plus.lastCheckTimestamp + checkCoolDown < now) {
    //  Plus account check. If we know it was not active then check again with a cooldown

    await ensurePage(TravianPath.AccountOverview);

    const page = await browserManager.getPage();
    const troopsNode = await page.$(`[href*="${TravianPath.AccountOverview}/troops"]`);

    AccountContext.plus = {
      lastCheckTimestamp: now,
      isActive: !!troopsNode,
    };

    if (troopsNode) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        troopsNode.click(),
      ]);

      const villageRows = await page.$$('#troops tbody tr');

      let success = false;

      //  Last 2 rows are just sum
      for (const villageRow of villageRows.slice(0, villageRows.length - 2)) {
        const nodeVillageId = await villageRow.$eval('.villageName [href*=newdid]', x => {
          const url = x.getAttribute('href') ?? '';

          return /newdid=(\d+)/.exec(url)?.[1];
        });

        if (!nodeVillageId) {
          throw new Error('Failed to parse village id');
        }

        if (nodeVillageId !== villageId) {
          continue;
        }

        const { tribe } = village;

        const getTroopAtIndex = async (index: number): Promise<number> =>
          villageRow.$eval(`td:nth-child(${index + 1})`,
            x => +(
              x.textContent ?? 0
            ),
          );

        village.units.resetCounts();

        for (const index of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
          const unitIndex = (tribe - 1) * 10 + index;
          const troopsAmount = await getTroopAtIndex(index);

          village.units.addCount(unitIndex, troopsAmount);
        }

        success = true;

        return;
      }

      if (!success) {
        throw new Error('Failed to find village troop stats in plus account overview');
      }
    }
  }

  let success = false;

  do {
    await ensureBuildingSpotPage(rallyPoint.fieldId, BuildingType.RallyPoint, { index: 1, name: 'tt' });

    const page = await browserManager.getPage();
    const detailNodes = await page.$$('table.troop_details');

    const details: TroopDetail[] = [];

    for (const detailNode of detailNodes) {
      const firstBodyRow = await detailNode.$('tbody.units tr');

      if (!firstBodyRow) {
        throw new Error('Table has no rows');
      }

      const originX = await parseCoordinate(firstBodyRow, '.coordinateX');
      const originY = await parseCoordinate(firstBodyRow, '.coordinateY');

      if (!originX || !originY) {
        continue;
      }

      const originVillage = AccountContext.getContext().villageService.villageByCoords(
        new Coords({ x: originX, y: originY }),
      );

      if (!originVillage) {
        //  not from this account's village
        continue;
      }

      const detailClass = await detailNode.evaluate((x) => x.className);
      const match = /troop_details$|troop_details ([^ ]+)/.exec(detailClass);

      if (!match) {
        throw new Error('Detail does not have a detail class');
      }

      const movementType = mapMovementType(match[1]);

      const unitAmounts = await parseUnitAmounts(detailNode);

      const detail: TroopDetail = {
        movementType,
        originVillageId: originVillage.id,
        unitAmounts,
      };

      details.push(detail);
    }

    const activeVillageId = await parseActiveVillageId();

    if (villageId !== activeVillageId) {
      await ensureVillageSelected(villageId);

      continue;
    }

    village.units.resetCounts();

    details
      .filter((d) => d.originVillageId === village.id)
      .forEach((detail) => {
        detail.unitAmounts.forEach((unitAmount) => {
          village.units.addCount(unitAmount.unitIndex, unitAmount.amount);
        });
      });

    success = true;
  } while (!success);
};
