import i18next from 'i18next';
import { tsQuerySelector } from '../../helpers/helpers';
import state from '../../state/state';
import { getBoardsById, updateBoard, deleteBoard } from '../../API/boards';
import { getColumnsInBoard, deleteColumn } from '../../API/columns';
import { IColumns, ITasks, ToastrType } from '../../data/types';
import { getTasksInColumn, deleteTask } from '../../API/tasks';
import { deletePointById, getPointsByTaskId } from '../../API/points';
import popUpMessages from '../popUpMessages/popupMessages';

export const consfirmEditBoard = async (e: Event) => {
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;
  e.stopPropagation();

  const boardTitleInput = <HTMLInputElement>(
    tsQuerySelector(<HTMLElement>target.closest('.project-card'), '.board-title__input')
  );
  const boardSettingEdit = tsQuerySelector(<HTMLElement>target.closest('.project-card'), '.board-setting__edit');
  const projectTitle = tsQuerySelector(<HTMLElement>target.closest('.project-card'), '.project-title');
  const boardEditForm = tsQuerySelector(<HTMLElement>target.closest('.project-card'), '.board-edit__form');

  const projectCard = <HTMLElement>target.closest('.project-card');
  const projectId = projectCard.id.split('-')[1];

  const projectCart = await getBoardsById(state.authToken, projectId);

  await updateBoard(state.authToken, projectId, {
    title: boardTitleInput.value,
    owner: projectCart.owner,
    users: projectCart.users,
  });

  if (projectTitle && boardSettingEdit && boardEditForm) {
    projectTitle.textContent = boardTitleInput.value;
    boardSettingEdit.classList.remove('hide');
    projectTitle.classList.remove('hide');
    boardEditForm.classList.add('hide');
    popUpMessages(ToastrType.success, i18next.t('boardTitleChangedMessage'));
  }
};

export const deleteProject = async (e: Event) => {
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;
  e.stopPropagation();

  const projectCard = <HTMLElement>target.closest('.project-card');
  const projectId = projectCard.id.split('-')[1];
  projectCard.remove();
  popUpMessages(ToastrType.success, i18next.t('boardDeletedMessage'));
  const getColumns: IColumns[] = await getColumnsInBoard(state.authToken, projectId);

  const getTasksPromises = getColumns.map(async (column) => {
    const tasksArray = await getTasksInColumn(state.authToken, projectId, column._id);
    return tasksArray;
  });
  const getTasks = (await Promise.all(getTasksPromises)).flat(Infinity);

  const getPointPromises = getTasks.map(async (task: ITasks) => {
    const pointsArray = await getPointsByTaskId(state.authToken, task._id);
    return pointsArray;
  });

  const getPoints = (await Promise.all(getPointPromises)).flat(Infinity);

  if (getPoints.length) {
    getPoints.forEach(async (el) => {
      await deletePointById(state.authToken, el._id);
    });
  }
  if (getTasks.length) {
    getTasks.forEach(async (el) => {
      await deleteTask(state.authToken, el.boardId, el.columnId, el._id);
    });
  }
  getColumns.forEach(async (el) => {
    await deleteColumn(state.authToken, el.boardId, el._id);
  });

  await deleteBoard(state.authToken, projectId);
};
