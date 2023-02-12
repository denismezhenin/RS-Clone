import getMembersContainer from '../pages/members/getMembersContainer';
import state from '../state/state';
import { MEMBERS_ON_PAGE } from '../constants/constants';

const getNextMembersPage = async (event: Event) => {
  if (event.target instanceof HTMLButtonElement) {
    state.membersPage += 1;

    const leftArrow = document.querySelector('.arrow-left');
    if (state.membersPage > 1 && leftArrow instanceof HTMLButtonElement) {
      leftArrow.disabled = false;
      leftArrow.classList.remove('arrow-inactive');
    }
    const totalPages = Math.ceil(state.members.length / MEMBERS_ON_PAGE);

    if (state.membersPage === totalPages) {
      event.target.disabled = true;
      event.target.classList.add('arrow-inactive');
    }
    document.querySelector('.member-cards')?.remove();
    const main = document.querySelector('.main-members');
    main?.prepend(await getMembersContainer());

    const pageCircles = document.querySelector('.members-page-circles');
    pageCircles?.childNodes.forEach((el) => {
      if (el instanceof HTMLDivElement) {
        el.classList.remove('page-circle-active');
      }
    });
    pageCircles?.children[state.membersPage - 1].classList.add('page-circle-active');
  }
};

export default getNextMembersPage;
