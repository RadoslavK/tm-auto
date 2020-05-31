import { MentorTask } from '../../../_models/mentor/mentorTask';
import { getPage } from '../../../browser/getPage';

export const acceptTaskReward = async (task: MentorTask): Promise<void> => {
  const page = await getPage();

  const taskNode = await page.$(`#mentorTaskList li.quest[data-questid=${task.id}]`);

  if (!taskNode) {
    throw new Error(`Did not find mentor task: ${task.id}`);
  }

  await taskNode.click();

  const claimSelector = `button.green[questid=${task.id}]`;
  const claim = await page.waitForSelector(claimSelector);

  await Promise.all([
    claim.click(),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  ]);
};