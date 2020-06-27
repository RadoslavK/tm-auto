import { getPage } from '../../../../browser/getPage';
import { replaceInputText } from '../../../../utils/browser/replaceInputText';

export const changeVillageName = async (): Promise<void> => {
  const page = await getPage();

  const nameInput = await page.$('input[name="villageName"]');

  if (!nameInput) {
    throw new Error('Did not find village name input');
  }

  const originalName = await page.evaluate(
    (e: Element) => e.getAttribute('value'),
    nameInput,
  );

  if (!originalName) {
    throw new Error('Did not find original village name');
  }

  await replaceInputText(page, nameInput, `${originalName}2`);
  // Click outside so its saved
  await page.click('#sidebarBoxVillagelist');
  await replaceInputText(page, nameInput, originalName);
};
