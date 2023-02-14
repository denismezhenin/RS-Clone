import getMembersContainer from '../pages/members/getMembersContainer';
import state from '../state/state';
import MEMBERS_ON_PAGE from '../constants/membersOnPage';

const getPrevMembersPage = async (event: Event) => {
  if (event.target instanceof HTMLButtonElement) {
    if (state.membersPage > 1) {
      event.target.disabled = false;
      event.target.classList.remove('arrow-inactive');
    }

    state.membersPage -= 1;

    const totalPages = Math.ceil(state.members.length / MEMBERS_ON_PAGE);
    const rightArrow = document.querySelector('.arrow-right');
    if (state.membersPage < totalPages && rightArrow instanceof HTMLButtonElement) {
      rightArrow.disabled = false;
      rightArrow.classList.remove('arrow-inactive');
    }
    if (state.membersPage === 1) {
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

export default getPrevMembersPage;
