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
import getBoardIcons from './getBoardIcons';
import setSelectedUserId from '../../features/setSelectedUserId';
import dragNdropTasks from '../../features/drag-n-drop/drag-n-dropTasks';
import dragNdropColumns from '../../features/drag-n-drop/drag-n-dropColumns';
import taskForm from '../taskForm/taskHTML';
import { tsQuerySelector, tsQuerySelectorAll } from '../../helpers/helpers';
// eslint-disable-next-line import/no-cycle
import createTaskFormListener from '../taskForm/createNewTask';
import { editTitle, confirmEditColumns, deleteColumnInBoard } from '../../features/columns/EditColumns';
import { setNewTaskFormListener } from '../taskForm/taskFormlistenerFunction';
import { getPointsByTaskId } from '../../API/points';
import { Board, User } from '../../data/types';

const Boards = {
  render: async () => `
  <div class="main_home">
    ${getAsideHtml()}
    <div class="main-board"></div>
  </div>
  `,
  after_render: async () => {
    document.body.classList.remove('body_home');
    const boardId = getBoardId();
    const main = tsQuerySelector(document, '.main-board');
    const columns = await getColumnsInBoard(state.authToken, boardId);
    const board: Board = await getBoardsById(state.authToken, boardId);
    const users: User[] = await getUsers(state.authToken);
    const usersIds = users.map((el) => el._id);
    const filteredBoardUsers = board.users.filter((el) => usersIds.includes(el));
    await updateBoard(state.authToken, boardId, { title: board.title, owner: board.owner, users: filteredBoardUsers });
    const inactiveUsers = getInactiveUsers(users, board.users);
    const boardControlHtml = await getBoardControlHtml(board.title, inactiveUsers);

    if (main) {
      let result = '';
      if (columns.length !== 0) {
        result = await getColumnHTML(state.authToken, boardId);
      } else {
        const COLUMNS_ARRAY = [
          i18next.t('firstColumnName'),
          i18next.t('secondColumnName'),
          i18next.t('thirdColumnName'),
        ];
        COLUMNS_ARRAY.map(async (el) => {
          await createColumns(state.authToken, state.boardId, { title: el, order: 0 });
        });

        result = await getColumnHTML(state.authToken, state.boardId);
      }
      main.innerHTML = `${boardControlHtml}${result}`;
      await drawColumnPlus();
    }

    if (board.users.length) {
      await getBoardIcons(board.users);
    }

    const membersSelect = <HTMLSelectElement>document.querySelector('.members-select');
    membersSelect.addEventListener('change', setSelectedUserId);
    const task = document.createElement('div');
    task.innerHTML = taskForm();
    main.append(task);
    main.id = boardId;

    await setNewTaskFormListener();
    await createTaskFormListener();
    await dragNdropColumns();
    await dragNdropTasks();

    const titleSettingEdit = tsQuerySelectorAll(document, '.title-setting__edit');
    titleSettingEdit.forEach((el) =>
      el.addEventListener('click', async (e) => {
        await editTitle(e, '.column', '.title-setting__edit', '.column-title', '.column-edit__form');
      })
    );

    const columnCofirmEdit = tsQuerySelectorAll(document, '.column-confirm-edit');
    columnCofirmEdit.forEach((el) => {
      el.addEventListener('click', (e) => confirmEditColumns(e, boardId));
    });

    const columnDeleteButton = tsQuerySelectorAll(document, '.column-delete__button');
    columnDeleteButton.forEach((el) => {
      el.addEventListener('click', (e) => deleteColumnInBoard(e, boardId));
    });

    const startDateContainer = [...tsQuerySelectorAll(document, '.start-date__container')];
    startDateContainer.map(async (el) => {
      const { id } = <Element>el.closest('.task');

      const result = (await getPointsByTaskId(state.authToken, id))[0].startDate || null;
      if (result) {
        el.innerHTML = result;
      }
    });

    const endDateContainer = [...tsQuerySelectorAll(document, '.end-date__container')];
    endDateContainer.map(async (el) => {
      const { id } = <Element>el.closest('.task');

      const result = (await getPointsByTaskId(state.authToken, id))[0].endDate || null;
      if (result) {
        el.innerHTML = result;
      }
    });
  },
};

export default Boards;
