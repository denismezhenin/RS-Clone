import state from '../state/state';
import getBoardIcons from '../pages/boards/getBoardIcons';
import { tsQuerySelector } from '../helpers/helpers';

export const getInvitedUsers = () => {
  const form = tsQuerySelector<HTMLFormElement>(document, '.new-card__form');
  const users = form.querySelector<HTMLDivElement>('.member-icons__task');
  const userArray = users?.dataset.users?.split(',');
  const res = userArray ? [...userArray] : [];
  const reslut: Set<string> = new Set(res);
  return reslut;
};

const inviteToTask = async () => {
  const membersSelect = document.querySelector('.members-select__task');
  const array = getInvitedUsers();
  const options = document.querySelectorAll('.task-members__option');
  const form = tsQuerySelector<HTMLFormElement>(document, '.new-card__form');
  const users = form.querySelector<HTMLDivElement>('.member-icons__task');
  if (!users) return;
  const MAX_VISIBLE_MEMBERS = 5;
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
      getBoardIcons(Array.from(array), '.member-icons__task', MAX_VISIBLE_MEMBERS);
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
