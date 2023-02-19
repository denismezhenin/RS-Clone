import state from '../state/state';
import getBoardIcons from '../pages/boards/getBoardIcons';

import { tsQuerySelector } from '../helpers/helpers';

export const getInvitedUsers = () => {
  const result: Set<string> = new Set();
  const form = tsQuerySelector<HTMLFormElement>(document, '.new-card__form');
  const users = form.querySelectorAll<HTMLDivElement>('.user-icon');
  users.forEach((el) => (el.dataset.memberId ? result.add(el.dataset.memberId) : null));
  return result;
};

const inviteToTask = async () => {
  const membersSelect = document.querySelector('.members-select__task');
  const array = getInvitedUsers();
  const options = document.querySelectorAll('.task-members__option');

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
