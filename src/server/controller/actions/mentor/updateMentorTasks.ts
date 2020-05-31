import { MentorTask } from '../../../_models/mentor/mentorTask';
import { accountContext } from '../../../accountContext';
import { getPage } from '../../../browser/getPage';

export const updateMentorTasks = async (): Promise<void> => {
  if (1 === 1) {
    return;
  }

  const page = await getPage();

  const taskNodes = await page.$$('#mentorTaskList li.quest');

  accountContext.mentorTasks = await Promise.all(taskNodes.map(async (taskNode) => {
    const id = await taskNode
      .getProperty('data-questid')
      .then(p => p.jsonValue());

    if (!id || typeof id !== 'string') {
      throw new Error('Did not find id of mentor task');
    }

    // const id = await page.evaluate(e => e.getAttribute('data-questid'), taskNode);
    const svgCheck = await taskNode.$('svg');
    const completed = !!svgCheck;

    return new MentorTask({
      completed,
      id,
    });
  }));
};