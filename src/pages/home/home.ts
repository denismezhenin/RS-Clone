import getAsideHtml from './getAsideHtml';
import state from '../../state/state';
import drawProjectsList from '../../features/drawProjectsList';
import listen from '../../features/listen';
import { tsQuerySelector } from '../../helpers/helpers';
import createTooltip from '../../features/createTooltip';
import hideAside from '../../features/hideAside/hideAside';

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
    `;
    return view;
  },
  after_render: async () => {
    if (state.authToken) {
      drawProjectsList();

      window.addEventListener('click', listen);
    }

    document.addEventListener('mouseover', createTooltip);
    document.addEventListener('mouseout', () => document.querySelector('.tooltip-block')?.remove());

    const hideAsideButton = tsQuerySelector(document, '.hide-aside__button');
    hideAsideButton.addEventListener('click', hideAside);
  },
};

export default Home;
