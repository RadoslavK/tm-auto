import { Page } from "puppeteer";
import { Tribe } from "../enums/Tribe";

const chooseTribe = async (page: Page, tribe: Tribe) => {
  await page.waitForSelector('#tribeSelectors input');

  const forms = await page.$$('form');
  await forms.forEach(async form => {
    const selectors = await form.$('#tribeSelectors');

    if (!selectors) {
      return;
    }

    const inputId = await selectors.$eval(`input[value='${tribe}']`, input => input.id);

    const lab = await page.$x(`//label[@for="${inputId}"]`);
    await lab[0].click();

    const label = await form.$(`label[for='${inputId}']`);
    await label.hover();
    await label.click();

    // const button = await form.$('button[type=button]');
    // console.log(await button.getProperty('id'));
    // await button.hover();
    // await button.click();
  });

  return;

  const inputId = await page.$eval(`#tribeSelectors input[value='${tribe}']`, selector => selector.id);

  const labelSelector = `label[for='${inputId}']`;
  await page.hover(labelSelector);
  await page.click(labelSelector);

  const buttonSelector = `form button[type=button]`;
  await page.hover(buttonSelector);
  await page.click(buttonSelector);
};

interface ISector {
  id: string,
  type: string,
}

type SectorType = 'nw' | 'no' | 'sw' | 'so';

const getSectors = (inputs: readonly Element[]): readonly ISector[] => inputs.map(input => ({
  id: input.getAttribute('id'),
  type: input.getAttribute('value'),
}));

const chooseSector = async (page: Page, type: SectorType | null = null) => {
  await page.waitForSelector('#map input');
  const sectors = await page.$$eval('#map input', getSectors);

  const selectedSector = type
    ? sectors.find(sector => sector.type === type)
    : sectors[Math.floor(Math.random() * 4)];

  const labelSelector = `label[for='${selectedSector.id}']`;

  await page.hover(labelSelector);
  await page.click(labelSelector);
};

