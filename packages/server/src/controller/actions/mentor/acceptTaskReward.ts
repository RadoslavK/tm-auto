import type { MentorTask } from '../../../_models/mentor/mentorTask.js';
import { getAccountContext } from '../../../accountContext.js';
import { getPage } from '../../../browser/getPage.js';

export const acceptTaskReward = async (task: MentorTask): Promise<void> => {
  const page = await getPage();

  const taskNode = await page.$(
    `#mentorTaskList li.quest[data-questid="${task.id}"]`,
  );

  if (!taskNode) {
    throw new Error(`Did not find mentor task: ${task.id}`);
  }

  await taskNode.click();

  const claimSelector = `button.green[questid=${task.id}]`;
  const claim = await page.waitForSelector(claimSelector);

  getAccountContext().logsService.logText(`Accepting mentor task: ${task.id}`);

  await Promise.all([
    claim.click(),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  ]);
};
