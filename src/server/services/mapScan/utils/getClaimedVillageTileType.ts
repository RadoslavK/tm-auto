import { JSDOM } from 'jsdom';

import { sendAjaxRequest } from '../../../utils/sendAjaxRequest';

const parseRes = (document: Document, index: number): string => {
  const node = document.querySelector(
    `#distribution tbody tr:first-child td:nth-child(${index})`,
  );

  if (!node || !node.textContent) {
    throw new Error(`Did not find tile detail res at index${index}`);
  }

  return node.textContent.trim();
};

export const getClaimedVillageTileType = async (
  x: number | string,
  y: number | string,
): Promise<string> => {
  const { html } = await sendAjaxRequest('viewTileDetails', {
    x: x.toString(),
    y: y.toString(),
  });

  const doc = new JSDOM(html).window.document;

  const wood = parseRes(doc, 1);
  const clay = parseRes(doc, 2);
  const iron = parseRes(doc, 3);
  const crop = parseRes(doc, 4);

  return `${wood}-${clay}-${iron}-${crop}`;
};
