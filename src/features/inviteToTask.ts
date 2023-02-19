import { getBoardsById, updateBoard } from '../API/boards';
import getBoardId from '../services/getBoardId';
import state from '../state/state';
import getBoardIcons from '../pages/boards/getBoardIcons';
import getActiveUsers from './getActiveUsers';
import { getUsers } from '../API/users';
import { getTaskById } from '../API/tasks';
import { tsQuerySelector, tsQuerySelectorAll } from '../helpers/helpers';

export const getInvitedUsers = () => {
  const result: Set<string> = new Set();
  const form = tsQuerySelector<HTMLFormElement>(document, '.new-card__form');
  const users = form.querySelectorAll<HTMLDivElement>('.user-icon');
  users.forEach((el) => (el.dataset.memberId ? result.add(el.dataset.memberId) : null));
  return result;
};

const inviteToTask = async () => {
  const membersSelect = document.querySelector('.members-select__task');
  // const boardId = getBoardId();
  // const form = tsQuerySelector<HTMLFormElement>(document, '.new-card__form');
  // const boardId = form.dataset.board;
  // const columnId = form.dataset.column;
  // const taskId = form.dataset.task;
  // if (!boardId || !columnId || !taskId) return;
  // const task = await getTaskById(state.authToken, boardId, columnId, taskId);

  // const users = await getUsers(state.authToken);
  // const array = getActiveUsers(users, board.users);
  const array = getInvitedUsers();

  // console.log(array)
  const options = document.querySelectorAll('.task-members__option');

  if (membersSelect instanceof HTMLSelectElement) {
    let id = state.selectedUserIdToTask;
    if (id === '') {
      const dataId = options[0].getAttribute('data-member-id');
      if (dataId) {
        id = dataId;
      }
    }
    if (!array.has(id)) {
      array.add(id);
      // await updateBoard(state.authToken, boardId, { title: board.title, owner: id, users: array });
      getBoardIcons(Array.from(array), '.member-icons__task');
      options.forEach((item) => {
        const dataId = item.getAttribute('data-member-id');
        if (dataId === id) {
          item.remove();
        }
      });
      state.selectedUserIdToTask = '';
    }
  }
};

export default inviteToTask;
