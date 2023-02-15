import { IColumns } from '../../data/types';
import { getTasksInColumn } from '../../API/tasks';
import state from '../../state/state';

const getProjectStatsItem = async (columns: IColumns[], text: string, name: string, projectId: string) => {
  const column = columns.filter((item) => item.title === name);
  const tasks = await getTasksInColumn(state.authToken, projectId, column[0]._id);
  const statsText = document.createElement('p');
  statsText.classList.add('project-stats-item');
  statsText.textContent = `Tasks ${text}: ${tasks.length}`;

  return statsText;
};

export default getProjectStatsItem;
