import getAsideHtml from '../home/getAsideHtml';
import createNewBoard from '../../features/createNewBoard';
import state from '../../state/state';
import drawProjectsList from '../../features/drawProjectsList';
import getColumnHTML from '../columns/columnsHtml';
import { createColumns, getColumnsInBoard } from '../../API/columns';
import taskForm from '../taskForm/taskHTML';
import { tsQuerySelector } from '../../helpers/helpers';
import createTaskFormListener from '../taskForm/createNewTask';

const Boards = {
  render: async () => `
  <div class="main_home">
    ${getAsideHtml()}
    <div class="main-board"></div>
  </div>`,
  after_render: async () => {
    const array = window.location.hash.split('/').reverse().join('/');
    const boardId = array.slice(0, array.indexOf('/'));
    const main = tsQuerySelector(document, '.main-board');
    const columns = await getColumnsInBoard(state.authToken, boardId);

    if (main) {
      if (columns.length !== 0) {
        const result = await getColumnHTML(state.authToken, boardId);
        main.innerHTML = result;
      } else {
        const firstColumn = await createColumns(state.authToken, state.boardId, { title: 'Todo', order: 0 });
        const secondColumn = await createColumns(state.authToken, state.boardId, { title: 'In progress', order: 0 });
        const thirdColumn = await createColumns(state.authToken, state.boardId, { title: 'Done', order: 0 });
        const result = await getColumnHTML(state.authToken, state.boardId);
        main.innerHTML = result;
      }
    }
    const task = document.createElement('div')
    task.innerHTML = taskForm()
    main.append(task)
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
      if (target.classList.contains('title-setting__add')) {
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
        const board = tsQuerySelector(document, '.new-card__form')
        const boardId = target.closest('.colums-list').id
        const columId = target.closest('.column').id
        board.dataset.board = boardId
        board.dataset.column = columId
      }
      if (target.classList.contains('new-card')) {

        // if (target.closest('colums-list')) return
        // if (board) {
        //   board.dataset.board = target.closest('colums-list')
        // }

        target.classList.toggle(
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

export default Boards;
