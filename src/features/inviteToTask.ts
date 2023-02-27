import state from '../state/state';
import getBoardIcons from '../pages/boards/getBoardIcons';

import { tsQuerySelector } from '../helpers/helpers';

export const getInvitedUsers = () => {
  // const result: Set<string> = new Set();
  // let result;
  const form = tsQuerySelector<HTMLFormElement>(document, '.new-card__form');
  const users = form.querySelector<HTMLDivElement>('.member-icons__task');
  // if (!users) return;
  if (users?.dataset.users) {
    // usersArray = users.dataset.users.length > 0 ? users.dataset.users?.split(',') : [];
    // const spred = (...usersArray)
    // result.add(...usersArray)
  }
  const userArray = users?.dataset.users?.split(',');
  // if (!u) return;
  // if (!usersArray) return;
  const result = userArray ? [...userArray] : [];
  // eslint-disable-next-line consistent-return
  const reslut2: Set<string> = new Set(result);

  return reslut2;
  // return result;
};

const inviteToTask = async () => {
  const membersSelect = document.querySelector('.members-select__task');
  const array = getInvitedUsers();
  const options = document.querySelectorAll('.task-members__option');
  const form = tsQuerySelector<HTMLFormElement>(document, '.new-card__form');
  const users = form.querySelector<HTMLDivElement>('.member-icons__task');
  if (!users) return;

  if (membersSelect instanceof HTMLSelectElement) {
    let id = state.selectedUserIdToTask;
    if (id === '') {
      const dataId = membersSelect.value;
      if (dataId) {
        id = dataId;
      }
    }
    if (!array.has(id)) {
      array.add(id);
      users.dataset.users = `${Array.from(array)}`;
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
