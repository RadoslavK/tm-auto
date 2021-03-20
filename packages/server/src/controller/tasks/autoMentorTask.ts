import { TaskType } from '../../_models/misc/taskType.js';
import type { AutoMentorSettings } from '../../_models/settings/autoMentorSettings.js';
import { getAccountContext } from '../../accountContext.js';
import { getPage } from '../../browser/getPage.js';
import type { completeTaskIds } from '../../constants/completeTaskIds.js';
import { acceptTaskReward } from '../actions/mentor/acceptTaskReward.js';
import { changeVillageName } from '../actions/mentor/completeTasks/changeVillageName.js';
import { createMarketOffer } from '../actions/mentor/completeTasks/createMarketOffer.js';
import { openCulturePointsTab } from '../actions/mentor/completeTasks/openCulturePointsTab.js';
import { openMap } from '../actions/mentor/completeTasks/openMap.js';
import { openStatisticsPage } from '../actions/mentor/completeTasks/openStatisticsPage.js';
import { openSurroundingReports } from '../actions/mentor/completeTasks/openSurroundingReports.js';
import { raidOasis } from '../actions/mentor/completeTasks/raidOasis.js';
import { readGoldAdvantanges } from '../actions/mentor/completeTasks/readGoldAdvantanges.js';
import { readMessage } from '../actions/mentor/completeTasks/readMessage.js';
import { updateMentorTasks } from '../actions/mentor/updateMentorTasks.js';
import type { BotTask } from '../taskEngine/botTaskEngine.js';

type CompleteTask = () => Promise<boolean | void>;

export const getCompleteTask = (
  taskId: typeof completeTaskIds[number],
): CompleteTask => {
  switch (taskId) {
    case 'World_01':
      return openStatisticsPage;
    case 'World_02':
      return changeVillageName;
    case 'World_05':
      return openMap;
    case 'World_06':
    case 'World_06a':
      return readMessage;
    case 'World_11':
      return openCulturePointsTab;
    case 'World_13':
      return openSurroundingReports;
    case 'Economy_07':
      return createMarketOffer;
    case 'Battle_07':
      return raidOasis;
    case 'World_07':
    case 'World_07a':
      return readGoldAdvantanges;

    default:
      throw new Error(`No task action for quest id: ${taskId}`);
  }
};

export class AutoMentorTask implements BotTask {
  private settings = (): AutoMentorSettings =>
    getAccountContext().settingsService.autoMentor.get();

  public allowExecution = (): boolean => {
    const {
      acceptDailyRewards,
      acceptTaskRewards,
      completeTasks,
    } = this.settings();

    return (
      acceptDailyRewards ||
      acceptTaskRewards ||
      (completeTasks.allow && !!completeTasks.allowedTaskIds.length)
    );
  };

  public execute = async (): Promise<void> => {
    await this.completeAndAcceptTaskRewards();
    await this.acceptDailyRewards();
  };

  private acceptDailyRewards = async (): Promise<void> => {
    if (!this.settings().acceptDailyRewards) {
      return;
    }

    const page = await getPage();

    const dailyRewards = await page.$('#navigation .dailyQuests');

    if (!dailyRewards) {
      throw new Error('Did not find daily rewards button');
    }

    const acceptableDailyRewards = await dailyRewards.$('.indicator');

    if (!acceptableDailyRewards) {
      return;
    }

    await Promise.all([
      acceptableDailyRewards.click(),
      page.waitForSelector('#achievementQuestList'),
    ]);

    const bubbleElements = await page.$$('.rewardReady');

    if (bubbleElements.length > 1) {
      throw new Error(
        'Encountered 2 or more daily rewards tasks to complete. Implement the action properly',
      );
    }

    await bubbleElements[0].click();

    const claimRewardButton = await page.waitForSelector(
      '[type="submit"].green.questButtonGainReward',
    );

    if (!claimRewardButton) {
      throw new Error('Did not find claim reward button');
    }

    getAccountContext().logsService.logText('Claiming daily reward');

    await Promise.all([
      claimRewardButton.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);
  };

  private completeAndAcceptTaskRewards = async (): Promise<void> => {
    const { completeTasks, acceptTaskRewards } = this.settings();

    if (!completeTasks.allow && !acceptTaskRewards) {
      return;
    }

    let hadAutomatedTasks: boolean;

    do {
      hadAutomatedTasks = false;

      await updateMentorTasks();

      for (const task of getAccountContext().mentorTasks) {
        if (!task.completed) {
          if (
            completeTasks.allow &&
            completeTasks.allowedTaskIds.includes(task.id)
          ) {
            const action = getCompleteTask(
              task.id as typeof completeTaskIds[number],
            );

            const result = await action();

            if (result !== false) {
              getAccountContext().logsService.logText(
                `Completed mentor task: ${task.id}`,
              );

              hadAutomatedTasks = true;
            }
          }

          continue;
        }

        if (acceptTaskRewards) {
          await acceptTaskReward(task);
          hadAutomatedTasks = true;
        }
      }
    } while (hadAutomatedTasks);
  };

  readonly type: TaskType = TaskType.AutoMentor;
}
