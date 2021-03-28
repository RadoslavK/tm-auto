import type { Page } from 'puppeteer';

import { isObject } from 'shared/utils/merge.js';
import { TokenType } from '../_models/gameInfo.js';
import { getAccountContext } from '../accountContext.js';
import { getPage } from '../browser/getPage.js';
import { accountService } from '../services/accountService.js';

type OldParams = {
  readonly page: Page;
  readonly ajaxToken: string;
  readonly server: string;
  readonly command: string;
  readonly params: object;
};

const populateUrlSearchParams = (
  params: URLSearchParams,
  data: object,
  keyPrefix?: string,
): void => {
  Object.entries(data).forEach(([key, value]) => {
    const valueKey = keyPrefix ? `${keyPrefix}[${key}]` : key;

    if (isObject(value)) {
      populateUrlSearchParams(params, value, valueKey);
    } else if (Array.isArray(value)) {
      if (!value.length) {
        return;
      }

      const arrValueKey = `${valueKey}[]`;

      value.forEach((arrValue) => {
        params.append(arrValueKey + '', arrValue.toString());
      });
    } else {
      params.append(valueKey, value.toString());
    }
  });
};

const sendAjaxRequestOld = async ({
  page,
  ajaxToken,
  command,
  params,
  server,
}: OldParams) => {
  const body = new URLSearchParams();

  populateUrlSearchParams(body, {
    cmd: command,
    ajaxToken,
    ...params,
  });

  const result = await page.evaluate(
    ({ server, command, body }) =>
      fetch(`${server}/ajax.php?cmd=${command}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body,
      }).then((r) => r.json()),
    { server, command, body: body.toString() },
  );

  return result.response.data;
};

export const sendAjaxRequest = async <T = any>(
  command: string,
  params: object,
  requestedPage?: Page,
): Promise<T> => {
  const page = requestedPage || (await getPage());
  const account = accountService.getCurrentAccount();
  const {
    gameInfo: { token },
  } = getAccountContext();

  if (token.type === TokenType.Ajax) {
    return sendAjaxRequestOld({
      page,
      ajaxToken: token.value,
      server: account.server,
      params,
      command,
    });
  }

  const body = JSON.stringify(params);

  return await page.evaluate(
    ({ server, bearerToken, body, command }) => {
      return fetch(`${server}/api/v1/ajax/${command}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        body,
      }).then((r) => r.json());
    },
    { server: account.server, bearerToken: token.value, body, command },
  );
};
