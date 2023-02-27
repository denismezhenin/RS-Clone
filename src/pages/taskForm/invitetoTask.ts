import { User } from '../../data/types';
// import { getUsers } from '../../API/users';
// import getInactiveUsers from '../../features/getInactiveUsers';
// import state from '../../state/state';
// import getBoardId from '../../services/getBoardId';

const invitetoTaskHTML = (users: User[]) =>
  `
<div class="board-control board-control_task">
    <div class="invite-block">
      <select class="members-select__task" name="assignees" id="assignees">
        ${users.map(
          (el) => `<option data-member-id=${el._id} class="task-members__option" value="${el._id}">${el.name}</option>`
        )}
      </select>
      <input type="button" class="button invite-button_task" value="Invite">
      <div class="member-icons__task"></div>
    </div>
  </div>
`;
export default invitetoTaskHTML;
