import Boards from '../pages/boards/boards';
import state from '../state/state';
import { deleteTask } from '../API/tasks';
import { tsQuerySelector } from '../helpers/helpers';
import formsParam from '../pages/taskForm/setTaskParams';
import editTask from '../pages/taskForm/editTask';
import { taskForm, Board, User } from '../data/types';
import getActiveUsers from './getActiveUsers';
import { getBoardsById } from '../API/boards';
import invitetoTaskHTML from '../pages/taskForm/invitetoTask';
import { getUsers } from '../API/users';
import getBoardIcons from '../pages/boards/getBoardIcons';

export const showDropDownMenu = (target: HTMLElement) => {
  const task = target.closest<HTMLElement>('.task');
  if (!task) return;
  tsQuerySelector(task, '.task-menu__list').classList.toggle('hide');
};

export const reloadBoard = async () => {
  await Boards.after_render();
};

export const deleteThisTask = async (target: HTMLElement) => {
  const boardId = target.closest<HTMLElement>('.main-board')?.id;
  const columnId = target.closest<HTMLElement>('.column')?.id;
  const taskId = target.closest<HTMLElement>('.task')?.id;
  if (!boardId || !columnId || !taskId) return;
  showDropDownMenu(target);
  await deleteTask(state.authToken, boardId, columnId, taskId);
  await reloadBoard();
};

export const editThisTask = async (target: HTMLElement) => {
  showDropDownMenu(target);
  const boardId = target.closest<HTMLElement>('.main-board')?.id;
  const task = target.closest<HTMLElement>('.task');
  if (!boardId || !task) return;
  const board: Board = await getBoardsById(state.authToken, boardId);
  const usersContainer = tsQuerySelector(task, '.task-assignees__container');
  if (!usersContainer || !usersContainer.dataset.users) return;
  const usersInvited = usersContainer.dataset.users.split(',');
  const users: User[] = await getUsers(state.authToken);
  const memberContainer = tsQuerySelector(document, '.create-card__members');
  const activeUsers = getActiveUsers(users, board.users);
  const inActiveUsers = activeUsers.filter((el) => !usersInvited.includes(el._id));
  memberContainer.innerHTML = invitetoTaskHTML(inActiveUsers);
  await getBoardIcons(usersInvited, `.member-icons__task`);
  formsParam(target, taskForm.edit);
  editTask(target);
};
