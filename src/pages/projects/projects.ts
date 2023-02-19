import i18next from 'i18next';
import getAsideHtml from '../home/getAsideHtml';
import state from '../../state/state';
import { getAllBoards } from '../../API/boards';
import { Board } from '../../data/types';
import getProjectsContainer from './getProjectsContainer';

const Projects = {
  render: async () => `
      <div class="main_home">
        ${getAsideHtml()}
        <div class="main-projects"></div>
      </div>
      `,
  after_render: async () => {
    document.body.classList.remove('body_home');
    const main = document.querySelector('.main-projects');
    const allBoards: Board[] = await getAllBoards(state.authToken);
    const userBoards = allBoards.filter((el) => el.users.includes(state.id));

    const newBoardBtn = document.createElement('button');
    newBoardBtn.classList.add('button', 'plus-board');
    newBoardBtn.textContent = i18next.t('addProjectButton');

    if (userBoards.length) {
      const projectsContainer = await getProjectsContainer(userBoards);
      main?.append(newBoardBtn, projectsContainer);
    } else {
      const noProjects = document.createElement('h2');
      noProjects.textContent = i18next.t('noProjects');
      main?.append(newBoardBtn, noProjects);
    }
  },
};

export default Projects;
