import i18next from 'i18next';
import { User } from '../../data/types';

const getBoardControlHtml = async (title: string, users: User[]) => `
<div class="board-control">
    <h2 class="board-title">${title}</h2>
    <div class="invite-block">
      <select class="members-select">
        ${users.map((el) => `<option data-member-id=${el._id}>${el.name}</option>`)}
      </select>
      <button class="button invite-button">${i18next.t('inviteButton')}</button>
      <div class="member-icons"></div>
    </div>
  </div>
`;

export default getBoardControlHtml;
