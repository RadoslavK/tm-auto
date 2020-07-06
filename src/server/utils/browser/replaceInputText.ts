import { ElementHandle, Page } from 'puppeteer-core';

// TODO take selector and retrieve input here?
export const replaceInputText = async (
  page: Page,
  input: ElementHandle,
  text: string,
): Promise<void> => {
  await input.focus();
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.keyboard.down('Backspace');
  await input.type(text);
};

export const replaceInputTextBySelector = async (
  page: Page,
  selector: string,
  text: string,
): Promise<void> => {
  const input = await page.$(selector);

  if (!input) {
    throw new Error(`Input for selector ${selector} was not found`);
  }

  await replaceInputText(page, input, text);
};
