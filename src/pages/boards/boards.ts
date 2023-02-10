import getAsideHtml from '../home/getAsideHtml';
import state from '../../state/state';
import drawProjectsList from '../../features/drawProjectsList';
import getColumnHTML from '../columns/columnsHtml';
import { createColumns, getColumnsInBoard } from '../../API/columns';
import { getBoardsById } from '../../API/boards';
import getBoardControlHtml from './getBoardControlHtml';
import UI from '../../data/UI';
import drawColumnPlus from './drawColumnPlus';
import { getUsers } from '../../API/users';
import getBoardId from '../../services/getBoardId';
import getInactiveUsers from '../../features/getInactiveUsers';
import getBoardIcons from './getBoardIcons';
import setSelectedUserId from '../../features/setSelectedUserId';
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
    if (state.authToken) {
      drawProjectsList();
    }

    const boardId = getBoardId();
    const main = document.querySelector('.main-board');
    const columns = await getColumnsInBoard(state.authToken, boardId);
    const board = await getBoardsById(state.authToken, boardId);
    const users = await getUsers(state.authToken);
    const inactiveUsers = getInactiveUsers(users, board.users);
    const boardControlHtml = getBoardControlHtml(board.title, inactiveUsers);

    if (main) {
      let result = '';
      if (columns.length !== 0) {
        result = await getColumnHTML(state.authToken, boardId);
      } else {
        const COLUMNS_ARRAY = [UI.firstColumnName, UI.secondColumnName, UI.thirdColumnName];
        COLUMNS_ARRAY.map(async (el) => await createColumns(state.authToken, state.boardId, { title: el, order: 0 }));
        result = await getColumnHTML(state.authToken, state.boardId);
      }
      main.innerHTML = `${boardControlHtml}${result}`;
      drawColumnPlus();
    }

    if (board.users.length) {
      getBoardIcons(board.users);
    }

    const membersSelect = <HTMLSelectElement>document.querySelector('.members-select');
    membersSelect.addEventListener('change', setSelectedUserId);

    dragNdropColumns();
    dragNdropTasks();
  },
};

export default Boards;
