import { getAllBoards } from '../../API/boards';
import { Board } from '../../data/types';
import state from '../../state/state';
import getAsideHtml from '../home/getAsideHtml';
import getMembersContainer from './getMembersContainer';
import MEMBERS_ON_PAGE from '../../constants/membersOnPage';

const Members = {
  render: async () => `
    <div class="main_home">
      ${getAsideHtml()}
      <div class="main-members"></div>
    </div>
    `,
  after_render: async () => {
    document.body.classList.remove('body_home');
    const main = document.querySelector('.main-members');
    const allBoards: Board[] = await getAllBoards(state.authToken);
    const userBoards = allBoards.filter((el) => el.users.includes(state.id));
    const members = Array.from(new Set(userBoards.map((el) => el.users).flat())).filter((el) => el !== state.id);
    state.members = members;

    const membersContainer = await getMembersContainer();

    const pageControls = document.createElement('div');
    pageControls.classList.add('members-page-controls');

    const arrowLeft = document.createElement('button');
    arrowLeft.classList.add('arrow-left');
    arrowLeft.textContent = '«';
    if (state.membersPage === 1) {
      arrowLeft.disabled = true;
      arrowLeft.classList.add('arrow-inactive');
    }

    const totalPages = Math.ceil(members.length / MEMBERS_ON_PAGE);
    const pageCircles = document.createElement('div');
    pageCircles.classList.add('members-page-circles');
    for (let i = 0; i < totalPages; i += 1) {
      const pageCircle = document.createElement('div');
      pageCircle.classList.add('page-circle');
      pageCircles.append(pageCircle);
    }
    pageCircles.children[state.membersPage - 1].classList.add('page-circle-active');

    const arrowRight = document.createElement('button');
    arrowRight.classList.add('arrow-right');
    arrowRight.textContent = '»';
    if (totalPages === 1) {
      arrowRight.disabled = true;
      arrowRight.classList.add('arrow-inactive');
    }

    pageControls.append(arrowLeft, pageCircles, arrowRight);

    main?.append(membersContainer, pageControls);
  },
};

export default Members;
