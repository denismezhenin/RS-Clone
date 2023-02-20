import i18next from 'i18next';
import getAsideHtml from '../home/getAsideHtml';
import state from '../../state/state';
import getColumnHTML from '../columns/columnsHtml';
import { createColumns, getColumnsInBoard } from '../../API/columns';
import { getBoardsById, updateBoard } from '../../API/boards';
import getBoardControlHtml from './getBoardControlHtml';
import drawColumnPlus from './drawColumnPlus';
import { getUsers } from '../../API/users';
import getBoardId from '../../services/getBoardId';
import getInactiveUsers from '../../features/getInactiveUsers';
import { tsQuerySelector } from '../../helpers/helpers';
import { Board, IColumns, User } from '../../data/types';
import addColumnsLogic from './addColumnsLogic';

const Boards = {
  render: async () => `
  <div class="main_home">
    ${getAsideHtml()}
    <div class="main-board"></div>
  </div>
  `,
  after_render: async () => {
    const boardId = getBoardId();
    const main = tsQuerySelector(document, '.main-board');
    const columns = await getColumnsInBoard(state.authToken, boardId);
    const board: Board = await getBoardsById(state.authToken, boardId);
    const users: User[] = await getUsers(state.authToken);
    const usersIds = users.map((el) => el._id);
    const filteredBoardUsers = board.users.filter((el) => usersIds.includes(el));
    await updateBoard(state.authToken, boardId, { title: board.title, owner: board.owner, users: filteredBoardUsers });
    const inactiveUsers = getInactiveUsers(users, board.users);

    if (main) {
      let result = '';
      if (columns.length !== 0) {
        result = await getColumnHTML(state.authToken, boardId);
        const boardControlHtml = await getBoardControlHtml(board.title, inactiveUsers);
        main.innerHTML = `${boardControlHtml}${result}`;
        await drawColumnPlus();
        await addColumnsLogic();
      } else {
        const COLUMNS_ARRAY = [
          i18next.t('firstColumnName'),
          i18next.t('secondColumnName'),
          i18next.t('thirdColumnName'),
        ];
        const columnPromises: Promise<IColumns>[] = [];
        COLUMNS_ARRAY.forEach((el, i) =>
          columnPromises.push(createColumns(state.authToken, state.boardId, { title: el, order: i }))
        );

        Promise.all(columnPromises).then(async () => {
          const boardControlHtml = await getBoardControlHtml(board.title, inactiveUsers);
          main.innerHTML = `${boardControlHtml}${await getColumnHTML(state.authToken, state.boardId)}`;
          await drawColumnPlus();
          await addColumnsLogic();
        });
      }
    }
  },
};

export default Boards;
