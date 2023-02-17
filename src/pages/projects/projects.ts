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
    document.body.classList.remove('body_home');
    const main = document.querySelector('.main-projects');
    const allBoards: Board[] = await getAllBoards(state.authToken);
    const userBoards = allBoards.filter((el) => el.users.includes(state.id));

    const newBoardBtn = document.createElement('button');
    newBoardBtn.classList.add('button', 'plus-board');
    newBoardBtn.textContent = UI.addProjectButton;

    const projectsContainer = await getProjectsContainer(userBoards);
    main?.append(newBoardBtn, projectsContainer);

    // const titleSettingEdit = tsQuerySelectorAll(document, '.board-setting__edit');
    // titleSettingEdit.forEach((el) =>
    //   el.addEventListener('click', async (e) =>
    //     editTitle(e, '.project-card', '.board-setting__edit', '.board-header', '.board-settings')
    //   )
    // );

    // const columnCofirmEdit = tsQuerySelectorAll(document, '.board-confirm-edit');
    // columnCofirmEdit.forEach((el) => {
    //   el.addEventListener('click', (e) => confirmEditColumns(e, boardId));
    // });

    // const columnDeleteButton = tsQuerySelectorAll(document, '.board-delete__button');
    // columnDeleteButton.forEach((el) => {
    //   el.addEventListener('click', (e) => deleteColumnInBoard(e, boardId));
    // });
  },
};

export default Projects;
