import getHomeHtml from './getHomeHtml';
import taskForm from '../taskForm/taskHTML';
import { tsQuerySelector } from '../../helpers/helpers';

const Home = {
  render: async () => {
    const view = getHomeHtml();
    return view;
  },
  after_render: async () => {
    document.addEventListener('click', async (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      const { target } = e;
      if (target.classList.contains('plus-img')) {
        const content = tsQuerySelector(document, '#page_container');
        const task = document.createElement('div');
        task.classList.add('new-card');
        task.innerHTML = taskForm;
        content.append(task);
      }
    });
  },
};

export default Home;
