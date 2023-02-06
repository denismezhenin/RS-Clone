import getAsideHtml from './getAsideHtml';
import createNewBoard from '../../features/createNewBoard';
import state from '../../state/state';
import { signIn } from '../../API/users';
import drawProjectsList from '../../features/drawProjectsList';
import taskForm from '../taskForm/taskHTML';
import { tsQuerySelector } from '../../helpers/helpers';

const Home = {
  render: async () => {
    const view = `
    <div class="main_home">
      ${getAsideHtml()}
      <div class="main-info">
        <h2 class="main-info_header">About the project</h2>
        <p>
          Task manager is a collaborative work management app designed to track team projects, highlight tasks underway, show who they are assigned to, and detail progress towards completion.
          <br>
          At its core, task manager relies on the principles of Kanban project boards to visualize workflows, providing managers and team members with a simple overview of a project from start to finish.
        </p>
      </div>
    </div>
    ${taskForm}
    `;
    return view;
  },
  after_render: async () => {
    const plusBtn = document.querySelector('.plus-img');
    if (plusBtn) {
      plusBtn.addEventListener('click', createNewBoard);
    }

    if (state.authToken) {
      drawProjectsList();
    }
    document.addEventListener('click', async (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      const { target } = e;
      if (target.classList.contains('plus-img')) {
        // const board = target.closest(board)
        // const column = target.closest(column)
        // const form = tsQuerySelector<HTMLFormElement>(
        //   document,
        //   '.new-card__form'
        // );
        // form.dataset.board = board
        // form.dataset.column = column
        // const content = tsQuerySelector(document, '#page_container');
        // const task = document.createElement('div');
        // task.classList.add('new-card', 'new-card__active');
        // task.innerHTML = taskForm;
        // content.append(task);
        tsQuerySelector(document, '.new-card').classList.toggle(
          'new-card__active'
        );
      }
      if (target.classList.contains('new-card')) {
        tsQuerySelector(document, '.new-card').classList.toggle(
          'new-card__active'
        );
      }
      if (target.classList.contains('create-card-action-cancel')) {
        tsQuerySelector(document, '.new-card').classList.toggle(
          'new-card__active'
        );
      }
    });
    createTaskFormListener();
  },
};

export default Home;

