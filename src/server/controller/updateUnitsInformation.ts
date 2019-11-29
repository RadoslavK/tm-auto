import { ElementHandle } from 'puppeteer';

import { Coords } from '../_models/coords';
import { BuildingType } from '../../_shared/types/buildingType';
import { accountContext } from '../accountContext';
import { getPage } from '../browser/getPage';
import { parseNumber } from '../utils/numberUtils';
import { ensureBuildingSpotPage } from './actions/ensurePage';

//  TODO add support of dorf3

//  TODO finish and check with various unit movements.. raid,support, coming back, trapped etc

enum MovementType {
  Unknown = 'Unknown',
  Return = 'Return',
  Attack = 'Attack',
  Raid = 'Raid',
  InVillage = 'InVillage',
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

interface IUnitAmount {
  readonly unitIndex: number;
  readonly amount: number;
}

interface ITroopDetail {
 readonly originVillageId: number;
 readonly movementType: MovementType;
 readonly unitAmounts: readonly IUnitAmount[];
}

const parseCoordinate = async (elementHandle: ElementHandle, className: string): Promise<number | null> => {
  const coordElement = await elementHandle.$(className);

  if (!coordElement) {
    return null;
  }

  const coordText = await coordElement.evaluate(x => (x as HTMLElement).innerText);
  return parseNumber(coordText);
};

const parseUnitAmounts = async (detailsHandle: ElementHandle): Promise<IUnitAmount[]> => {
  const amounts = await detailsHandle.$$eval('tbody[class="units last"] tr td', countColumns => {
    return countColumns.map(column => +(column as HTMLElement).innerText);
  });

  const indexes = await detailsHandle.$$eval('tbody[class="units"] tr td.uniticon img', icons => {
    return icons.map(icon => {
      const heroIndexMatch = /unit uhero/.exec(icon.className);

      if (heroIndexMatch) {
        return null;
      }

      const unitIndexMatch = /unit u(\d+)/.exec(icon.className);

      if (!unitIndexMatch) {
        throw new Error('Could not parse unit index');
      }

      return +unitIndexMatch[1];
    });
  });

  return indexes.reduce((reduced, unitIndex, index) => {
    return unitIndex
      ? [...reduced, { unitIndex, amount: amounts[index] ||0 }]
      : reduced;
  }, [] as IUnitAmount[]);
};

export const updateUnitsInformation = async (): Promise<void> => {
  const village = accountContext.villageService.currentVillage();

  const rallyPoint = village.buildings.spots.ofType(BuildingType.RallyPoint);

  if (!rallyPoint || !rallyPoint.isBuilt()) {
    return;
  }

  await ensureBuildingSpotPage(rallyPoint.fieldId, { index: 1, name: 'tt' });

  const page = await getPage();
  const detailNodes = await page.$$('table.troop_details');

  const details: ITroopDetail[] = [];

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

    const originVillage = accountContext.villageService.villageByCoords(new Coords({ x: originX, y: originY }));

    if (!originVillage) {
      //  not from this account's village
      continue;
    }

    const detailClass = await detailNode.evaluate(x => x.className);
    const match = /troop_details$|troop_details ([^ ]+)/.exec(detailClass);

    if (!match) {
      throw new Error('Detail does not have a detail class');
    }

    const movementType = mapMovementType(match[1]);

    const unitAmounts = await parseUnitAmounts(detailNode);

    const detail: ITroopDetail = {
      originVillageId: originVillage.id,
      movementType,
      unitAmounts,
    };

    details.push(detail);
  }

  village.units.resetCounts();

  details
    .filter(d => d.originVillageId === village.id)
    .forEach(detail => {
      detail.unitAmounts.forEach(unitAmount => {
        village.units.addCount(unitAmount.unitIndex, unitAmount.amount);
      });
    });
};
