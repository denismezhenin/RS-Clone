import i18next from 'i18next';
import { getColumnsInBoard } from '../../API/columns';
import { getTasksSetByBoardId } from '../../API/tasks';
import { Board, IColumns, ITasks } from '../../data/types';
import { tsQuerySelectorAll } from '../../helpers/helpers';
import state from '../../state/state';
import getProjectStatsItem from './getProjectStatsItem';
import { editTitle } from '../../features/columns/EditColumns';
import { consfirmEditBoard, deleteProject } from '../../features/editBoards/editBoards';

const projectOpen = (e: Event) => {
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;
  const projectCard = <HTMLElement>target.closest('.project-card');
  if (projectCard) {
    const id = projectCard.id.split('-')[1];
    window.location.href = `#/projects/${id}`;
  }
};

const getProjectsContainer = async (projects: Board[]) => {
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

    const boardEdit = `
    <div class="board-card__settings">
  <div class='board-edit__form hide'>
    <input class='board-title__input' type='text' value=${el.title}>
    <button type="button" class='board-confirm-edit'><img class='confirm-img' src='../../assets/icons/done.svg'></button>
    <button type="button" class='board-delete__button'><img class='delete-img' src="../../assets/icons/delete-button.svg"></button>
  </div>
  <button type='button' class="board-setting__edit"><img src='../../assets/icons/edit-button.svg' alt='edit'></button>
 </div>
    `;
    titleContainer.innerHTML += boardEdit;

    const titleSettingEdit = <HTMLButtonElement[]>[...tsQuerySelectorAll(document, '.board-setting__edit')];
    titleSettingEdit.forEach((item) =>
      item.addEventListener('click', async (e) =>
        editTitle(e, '.project-card', '.board-setting__edit', '.project-title', '.board-edit__form')
      )
    );
    card.addEventListener('click', projectOpen);

    const boardConfirmEdit = tsQuerySelectorAll(document, '.board-confirm-edit');
    boardConfirmEdit.forEach((item) => {
      item.addEventListener('click', consfirmEditBoard);
    });

    const boardTitleInput = tsQuerySelectorAll(document, '.board-title__input');
    boardTitleInput.forEach((item) => {
      item.addEventListener('click', (e: Event) => {
        e.stopPropagation();
      });
    });
    const boardDeleteButton = tsQuerySelectorAll(document, '.board-delete__button');
    boardDeleteButton.forEach((item) => {
      item.addEventListener('click', deleteProject);
    });
  });

  return membersContainer;
};

export default getProjectsContainer;
