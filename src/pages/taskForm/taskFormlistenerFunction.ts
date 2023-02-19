import { getUsers } from '../../API/users';
import { taskForm, Board, User } from '../../data/types';
import { tsQuerySelector } from '../../helpers/helpers';
import formsParam from './setTaskParams';
import { getBoardsById } from '../../API/boards';
import state from '../../state/state';
import getActiveUsers from '../../features/getActiveUsers';
import invitetoTaskHTML from './invitetoTask';

export const resetCreateTaskForm = () => {
  tsQuerySelector(document, '.new-card').classList.toggle('new-card__active');
  tsQuerySelector<HTMLFormElement>(document, '.new-card__form').reset();
};

export const toggleTaskForm = () => {
  tsQuerySelector(document, '.new-card').classList.toggle('new-card__active');
};

export const setNewTaskFormListener = async () => {
  document.addEventListener('click', async (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    const { target } = e;
    if (target.classList.contains('title-setting__add')) {
      formsParam(target, taskForm.submit);
      const boardId = target.closest('.main-board')?.id;
      if (!boardId) return;
      const board: Board = await getBoardsById(state.authToken, boardId);
      const users: User[] = await getUsers(state.authToken);
      const memberContainer = tsQuerySelector(document, '.create-card__members');
      const activeUsers = getActiveUsers(users, board.users);
      memberContainer.innerHTML = invitetoTaskHTML(activeUsers);
    }
  });
};
