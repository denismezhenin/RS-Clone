import i18next from 'i18next';
import { User } from '../../data/types';

const invitetoTaskHTML = (users: User[], str = '') =>
  `
<div class="board-control board-control_task">
    <div class="invite-block">
      <select class="members-select__task" name="assignees" id="assignees">
        ${users.map(
          (el) => `<option data-member-id=${el._id} class="task-members__option" value="${el._id}">${el.name}</option>`
        )}
      </select>
      <input type="button" class="button invite-button_task" value="${i18next.t('inviteButton')}">
      <div class="member-icons__task" data-users="${str}"></div>
    </div>
  </div>
`;
export default invitetoTaskHTML;
