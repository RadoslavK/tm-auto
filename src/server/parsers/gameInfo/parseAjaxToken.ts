import { getPage } from '../../browser/getPage';

export const parseAjaxToken = async (): Promise<string> => {
  const page = await getPage();

  const content = await page.content();
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

  return token as string;
};
