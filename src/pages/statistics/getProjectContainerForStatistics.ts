import i18next from 'i18next';
import { getTasksSetByBoardId } from '../../API/tasks';
import { Board, IColumns, ITasks } from '../../data/types';
import state from '../../state/state';
import { getColumnsInBoard } from '../../API/columns';
import getProjectStatsItem from '../projects/getProjectStatsItem';

const statisticsOpen = (e: Event) => {
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;
  const projectCard = <HTMLElement>target.closest('.project-card');
  if (projectCard) {
    const id = projectCard.id.split('-')[1];
    window.location.href = `#/statistics/${id}`;
  }
};

const getProjectsContainerForStatistics = async (projects: Board[]) => {
  const membersContainer = document.createElement('section');
  membersContainer.classList.add('project-cards');

  projects.forEach(async (el) => {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.id = `project-${el._id}`;

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('project-title__container');

    const title = document.createElement('h5');
    title.classList.add('project-title');
    title.textContent = el.title.toUpperCase();

    const stats = document.createElement('div');
    stats.classList.add('project-stats');

    const tasks: ITasks[] = await getTasksSetByBoardId(state.authToken, el._id);
    const totalTasks = document.createElement('p');
    totalTasks.classList.add('project-stats-item', 'project-stats-total');
    totalTasks.textContent = `${i18next.t('tasksTotal')}: ${tasks.length}`;

    const columns: IColumns[] = await getColumnsInBoard(state.authToken, el._id);

    const todoColumn = await getProjectStatsItem(columns, i18next.t('toDo'), i18next.t('firstColumnName'), el._id);
    const inProgressColumn = await getProjectStatsItem(
      columns,
      i18next.t('inProgress'),
      i18next.t('secondColumnName'),
      el._id
    );
    const doneColumn = await getProjectStatsItem(columns, i18next.t('done'), i18next.t('thirdColumnName'), el._id);

    titleContainer.appendChild(title);
    stats.append(totalTasks, todoColumn, inProgressColumn, doneColumn);
    card.append(titleContainer, stats);
    membersContainer.appendChild(card);

    card.addEventListener('click', statisticsOpen);
  });
  return membersContainer;
};
export default getProjectsContainerForStatistics;
