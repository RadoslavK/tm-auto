import { getAccountContext } from '../accountContext';
import { getPage } from '../browser/getPage';
import { accountService } from '../services/accountService';

export const sendAjaxRequest = async <T = any>(
  command: string,
  params: Record<string, string>,
): Promise<T> => {
  const page = await getPage();

  const {
    gameInfo: { ajaxToken },
  } = getAccountContext();
  const account = accountService.getCurrentAccount();

  const result = await page.evaluate(
    ({ account, ajaxToken, command, params }) => {
      const body = new URLSearchParams();

      body.append('cmd', command);
      body.append('ajaxToken', ajaxToken);

      Object.entries(params).forEach(([name, value]) => {
        body.append(name, value as string);
      });

      return fetch(`${account.server}/ajax.php?cmd=${command}`, {
        method: 'POST',
        body,
      }).then((r) => r.json());
    },
    { account, ajaxToken, command, params },
  );

  return result.response.data;
};
