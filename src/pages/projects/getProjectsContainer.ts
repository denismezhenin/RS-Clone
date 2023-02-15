import { getColumnsInBoard } from '../../API/columns';
import { getTasksSetByBoardId } from '../../API/tasks';
import { Board, IColumns, ITasks } from '../../data/types';
import UI from '../../data/UI';
import state from '../../state/state';
import getProjectStatsItem from './getProjectStatsItem';

const getProjectsContainer = async (projects: Board[]) => {
  const membersContainer = document.createElement('section');
  membersContainer.classList.add('project-cards');

  projects.forEach(async (el) => {
    const card = document.createElement('a');
    card.classList.add('project-card');
    card.href = `#/projects/${el._id}`;

    const title = document.createElement('h5');
    title.classList.add('project-title');
    title.textContent = el.title.toUpperCase();

    const stats = document.createElement('div');
    stats.classList.add('project-stats');

    const tasks: ITasks[] = await getTasksSetByBoardId(state.authToken, el._id);
    const totalTasks = document.createElement('p');
    totalTasks.classList.add('project-stats-item', 'project-stats-total');
    totalTasks.textContent = `Tasks total: ${tasks.length}`;

    const columns: IColumns[] = await getColumnsInBoard(state.authToken, el._id);

    const todoColumn = await getProjectStatsItem(columns, 'to do', UI.firstColumnName, el._id);
    const inProgressColumn = await getProjectStatsItem(columns, 'in progress', UI.secondColumnName, el._id);
    const doneColumn = await getProjectStatsItem(columns, 'done', UI.thirdColumnName, el._id);

    stats.append(totalTasks, todoColumn, inProgressColumn, doneColumn);
    card.append(title, stats);
    membersContainer.appendChild(card);
  });

  return membersContainer;
};

export default getProjectsContainer;
