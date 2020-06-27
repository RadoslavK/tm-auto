import { getPage } from '../../../../browser/getPage';

export const readGoldAdvantanges = async (): Promise<void> => {
  const page = await getPage();

  await Promise.all([
    page.click('#header .shop'),
    page.waitForSelector('#paymentWizard'),
  ]);

  await Promise.all([
    page.click('#paymentWizard .tabButton.pros .text'),
    page.waitForSelector('[name="featureName"]'),
  ]);

  await Promise.all([
    page.click('#dialogCancelButton'),
    page.waitFor(() => !document.querySelector('[name="featureName"]')),
  ]);
};
