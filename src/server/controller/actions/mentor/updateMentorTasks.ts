import { MentorTask } from '../../../_models/mentor/mentorTask';
import { accountContext } from '../../../accountContext';
import { getPage } from '../../../browser/getPage';

export const updateMentorTasks = async (): Promise<void> => {
  const page = await getPage();

  const taskNodes = await page.$$('#mentorTaskList li.quest');

  accountContext.mentorTasks = await Promise.all(taskNodes.map(async (taskNode) => {
    const id = await page.evaluate((node: Element) => node.getAttribute('data-questid'), taskNode);

    if (!id) {
      throw new Error('Did not find id of mentor task');
    }

    const svgCheck = await taskNode.$('svg');
    const completed = !!svgCheck;

    return new MentorTask({
      completed,
      id,
    });
  }));
};