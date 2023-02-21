// import i18next from 'i18next';
import getAsideHtml from '../home/getAsideHtml';
// import state from '../../state/state';

const Tasks = {
  render: async () => `
      <div class="main_home">
        ${getAsideHtml()}
        <div class="main-tasks"></div>
      </div>
      `,
  after_render: async () => {
    console.log(9);
  },
};

export default Tasks;
