import getHomeHtml from './getHomeHtml';
import taskForm from '../taskForm/taskHTML';
import { tsQuerySelector } from '../../helpers/helpers';
import createTaskFormListener from '../taskForm/createNewTask'

const Home = {
  render: async () => {
    let view = getHomeHtml();
    view += taskForm;
    return view;
  },
  after_render: async () => {
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
