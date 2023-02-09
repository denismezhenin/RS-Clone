import getAsideHtml from '../home/getAsideHtml';
import createNewBoard from '../../features/createNewBoard';
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
import taskForm from '../taskForm/taskHTML';
import { tsQuerySelector } from '../../helpers/helpers';
import createTaskFormListener from '../taskForm/createNewTask';

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
    const main = tsQuerySelector(document, '.main-board');
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
        const COLUMNS = [UI.firstColumnName, UI.secondColumnName, UI.thirdColumnName];
        COLUMNS.map(async (el) => await createColumns(state.authToken, state.boardId, { title: el, order: 0 }));
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
    const task = document.createElement('div')
    task.innerHTML = taskForm()
    main.append(task)
    main.id = boardId
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
        const boardId = target.closest('.colums-list')?.id
        const columId = target.closest('.column')?.id
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
    dragNdropColumns();
    dragNdropTasks();
  },
};

export default Boards;
