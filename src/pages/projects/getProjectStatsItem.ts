import i18next from 'i18next';
import { IColumns } from '../../data/types';
import { getTasksInColumn } from '../../API/tasks';
import state from '../../state/state';

const getProjectStatsItem = async (columns: IColumns[], text: string, name: string, projectId: string) => {
  let column: IColumns[];
  if (name === 'Todo' || name === 'Выполнить') {
    column = columns.filter((item) => item.title === 'Todo' || item.title === 'Выполнить');
  } else if (name === 'In progress' || name === 'В работе') {
    column = columns.filter((item) => item.title === 'In progress' || item.title === 'В работе');
  } else {
    column = columns.filter((item) => item.title === 'Done' || item.title === 'Сделано');
  }
  const tasks = await getTasksInColumn(state.authToken, projectId, column[0]._id);
  const statsText = document.createElement('p');
  statsText.classList.add('project-stats-item');
  statsText.textContent = `${i18next.t('tasks')} ${text}: ${tasks.length}`;

  return statsText;
};

export default getProjectStatsItem;
