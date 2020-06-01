import {
  ElementHandle,
  Page,
} from 'puppeteer';

export const replaceInputText = async (page: Page, input: ElementHandle, text: string): Promise<void> => {
  await input.focus();
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.keyboard.down('Backspace');
  await input.type(text);
};