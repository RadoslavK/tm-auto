import { getPage } from '../../../../browser/getPage';

export const readGoldAdvantanges = async (): Promise<void> => {
  const page = await getPage();

  const [, advantagesTab] = await Promise.all([
    page.click('#header .shop'),
    page.waitForSelector('#paymentWizard .tabButton.pros .text'),
  ]);

  // so we can click the middle of the text
  const rect = await page.evaluate((el) => {
    const { top, left, width, height } = el.getBoundingClientRect();
    return { top, left, width, height };
  }, advantagesTab);

  await Promise.all([
    page.mouse.click(rect.left + rect.width / 2, rect.top + rect.height / 2),
    page.waitForSelector('[name="featureName"]'),
  ]);

  await Promise.all([
    page.click('#dialogCancelButton'),
    page.waitFor(() => !document.querySelector('[name="featureName"]')),
  ]);
};
