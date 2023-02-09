import { User } from '../../data/types';

const getBoardControlHtml = (title: string, users: User[]) => `
<div class="board-control">
    <h2 class="board-title">${title}</h2>
    <div class="invite-block">
      <select class="members-select">
        ${users.map((el) => `<option data-member-id=${el._id}>${el.name}</option>`)}
      </select>
      <button class="button invite-button">Invite</button>
      <div class="member-icons"></div>
    </div>
  </div>
`;

export default getBoardControlHtml;
