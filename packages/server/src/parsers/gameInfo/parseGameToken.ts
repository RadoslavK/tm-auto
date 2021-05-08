import {
  Token,
  TokenType,
} from '../../_models/gameInfo.js';
import { browserManager } from '../../browser/browserManager.js';

export const parseGameToken = async (): Promise<Token> => {
  const page = await browserManager.getPage();
  const content = await page.content();

  const usesAjaxToken = await page.evaluate(() => !!(window as any).ajaxToken);

  if (!usesAjaxToken) {
    const tokenMatch = /eval\(atob\('(.*?)'\)\)/.exec(content);

    if (tokenMatch) {
      const [, tokenEvalCommand] = tokenMatch;
      const token = await page.evaluate((cmd) => eval(atob(cmd)), tokenEvalCommand);

      return {
        type: TokenType.Bearer,
        value: token,
      };
    }

    const bearerVariableMatch = /Travian\.Game\.Preferences.*?Travian\.(.*?) =.*?<\/script>/s.exec(
      content,
    );

    if (!bearerVariableMatch) {
      throw new Error('Did not find bearer token variable');
    }

    const [, bearerVariableName] = bearerVariableMatch;

    const token = await page.evaluate(
      (bearerVariableName) => (window as any).Travian[bearerVariableName],
      bearerVariableName,
    );

    return {
      type: TokenType.Bearer,
      value: token as string,
    };
  }

  const ajaxFunctionMatch = /Travian\.Templates.*?Travian\.(.*?)\s=\sfunction/s.exec(
    content,
  );

  if (!ajaxFunctionMatch) {
    throw new Error('Did not find ajax returning function');
  }

  const [, ajaxFunctionName] = ajaxFunctionMatch;

  const token = await page.evaluate(
    (ajaxFunctionName) => (window as any).Travian[ajaxFunctionName](),
    ajaxFunctionName,
  );

  if (!token) {
    throw new Error('Did not find ajax token');
  }

  return {
    type: TokenType.Ajax,
    value: token as string,
  };
};
