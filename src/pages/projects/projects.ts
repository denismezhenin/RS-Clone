import getAsideHtml from '../home/getAsideHtml';
import state from '../../state/state';
import { getAllBoards } from '../../API/boards';
import { Board } from '../../data/types';
import getProjectsContainer from './getProjectsContainer';
import UI from '../../data/UI';

const Projects = {
  render: async () => `
      <div class="main_home">
        ${getAsideHtml()}
        <div class="main-projects"></div>
      </div>
      `,
  after_render: async () => {
    const main = document.querySelector('.main-projects');
    const allBoards: Board[] = await getAllBoards(state.authToken);
    const userBoards = allBoards.filter((el) => el.users.includes(state.id));

    const newBoardBtn = document.createElement('button');
    newBoardBtn.classList.add('button', 'plus-board');
    newBoardBtn.textContent = UI.addProjectButton;

    const projectsContainer = await getProjectsContainer(userBoards);
    main?.append(newBoardBtn, projectsContainer);
  },
};

export default Projects;
