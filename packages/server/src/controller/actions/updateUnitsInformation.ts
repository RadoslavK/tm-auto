import type { ElementHandle } from 'puppeteer';
import { BuildingType } from 'shared/enums/BuildingType.js';

import { Coords } from '../../_models/coords.js';
import { AccountContext } from '../../accountContext.js';
import { getPage } from '../../browser/getPage.js';
import { parseNumber } from '../../utils/numberUtils.js';
import { ensureBuildingSpotPage } from './ensurePage.js';

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

export const updateUnitsInformation = async (): Promise<void> => {
  const village = AccountContext.getContext().villageService.currentVillage();

  const rallyPoint = village.buildings.spots.ofType(BuildingType.RallyPoint);

  if (!rallyPoint || !rallyPoint.isBuilt()) {
    return;
  }

  await ensureBuildingSpotPage(rallyPoint.fieldId, BuildingType.RallyPoint, { index: 1, name: 'tt' });

  const page = await getPage();
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

  village.units.resetCounts();

  details
    .filter((d) => d.originVillageId === village.id)
    .forEach((detail) => {
      detail.unitAmounts.forEach((unitAmount) => {
        village.units.addCount(unitAmount.unitIndex, unitAmount.amount);
      });
    });
};
