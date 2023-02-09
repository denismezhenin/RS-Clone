import getAsideHtml from '../home/getAsideHtml';
import createNewBoard from '../../features/createNewBoard';
import state from '../../state/state';
import drawProjectsList from '../../features/drawProjectsList';
import getColumnHTML from '../columns/columnsHtml';
import { createColumns, getColumnsInBoard } from '../../API/columns';
import dragNdropTasks from '../../features/drag-n-drop/drag-n-dropTasks';
import dragNdropColumns from '../../features/drag-n-drop/drag-n-dropColumns';


const Boards = {
  render: async () => `
  <div class="main_home">
    ${getAsideHtml()}
    <div class="main-board"></div>
  </div>
  `,
  after_render: async () => {
    const array = window.location.hash.split('/').reverse().join('/');
    const boardId = array.slice(0, array.indexOf('/'));
    const main = document.querySelector('.main-board');
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

    const plusBtn = document.querySelector('.plus-img');
    if (plusBtn) {
      plusBtn.addEventListener('click', createNewBoard);
    }
    if (state.authToken) {
      drawProjectsList();
    }

    dragNdropColumns();
    dragNdropTasks();
  },
};

export default Boards;
