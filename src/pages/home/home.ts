import getAsideHtml from './getAsideHtml';
import state from '../../state/state';
import listen from '../../features/listen';
import { getUsers } from '../../API/users';

const Home = {
  render: async () => {
    if (!(await getUsers(state.authToken))[0]) {
      window.location.href = '#/signin';
    }
    const view = `
    <div class="main_home">
      ${getAsideHtml()}
      <div class="main-info">
        <h2 class="main-info_header">About Task Manager</h2>
        <p>
          Our project is a collaborative work management app designed to track team projects, highlight tasks underway, show who they are assigned to, and detail progress towards completion.
          <br>
          At its core, task manager relies on the principles of Kanban project boards to visualize workflows, providing managers and team members with a simple overview of a project from start to finish.
        </p>
      </div>
    </div>
    `;
    return view;
  },
  after_render: async () => {
    document.body.classList.add('body_home');

    if (state.authToken) {
      window.addEventListener('click', listen);
    }
  },
};

export default Home;
