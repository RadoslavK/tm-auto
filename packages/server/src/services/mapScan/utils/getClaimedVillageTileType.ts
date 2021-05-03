import parse, { HTMLElement } from 'node-html-parser';
import type { Page } from 'puppeteer-core';

import { sendAjaxRequest } from '../../../utils/sendAjaxRequest.js';

const parseRes = (responseElement: HTMLElement, index: number): string => {
  const node = responseElement.querySelector(
    `#distribution tbody tr:first-child td:nth-child(${index})`,
  );

  if (!node || !node.textContent) {
    throw new Error(`Did not find tile detail res at index${index}`);
  }

  return node.textContent.trim();
};

type AjaxResponse = {
  readonly html: string;
};

export const getClaimedVillageTileType = async (
  x: number,
  y: number,
  page: Page,
): Promise<string> => {
  const { html } = await sendAjaxRequest<AjaxResponse>('viewTileDetails', { x, y }, page);

  const responseElement = parse(html);

  const wood = parseRes(responseElement, 1);
  const clay = parseRes(responseElement, 2);
  const iron = parseRes(responseElement, 3);
  const crop = parseRes(responseElement, 4);

  return `${wood}-${clay}-${iron}-${crop}`;
};
