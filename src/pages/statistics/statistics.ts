import i18next from 'i18next';
import { Board } from '../../data/types';
import getAsideHtml from '../home/getAsideHtml';
import { getAllBoards } from '../../API/boards';
import state from '../../state/state';

import getProjectsContainerForStatistics from './getProjectContainerForStatistics';
import { checkHideAside } from '../../features/hideAside/hideAside';

const Statistics = {
  render: async () => `
    <div class="main_home">
      ${getAsideHtml()}
      <div class="main-statistics"></div>
    </div>
    `,
  after_render: async () => {
    const link = <HTMLAnchorElement>document.querySelector('.aside-stats');
    link.classList.add('active-link');
    link.style.pointerEvents = 'none';
    checkHideAside();

    document.body.classList.remove('body_home');
    const main = document.querySelector('.main-statistics');
    const allBoards: Board[] = await getAllBoards(state.authToken);
    const userBoards = allBoards.filter((el) => el.users.includes(state.id));

    if (userBoards.length) {
      const projectsContainer = await getProjectsContainerForStatistics(userBoards);
      main?.append(projectsContainer);
    } else {
      const noProjects = document.createElement('h2');
      noProjects.textContent = i18next.t('noProjects');
      main?.append(noProjects);
    }
  },
};

export default Statistics;
