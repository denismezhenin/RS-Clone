import getBoardId from '../../services/getBoardId';
import state from '../../state/state';
import { getTasksSetByBoardId } from '../../API/tasks';
import { getColumnsInBoard } from '../../API/columns';
import { Board, IColumns, ITasks } from '../../data/types';
import UI from '../../data/UI';
import { getBoardsById } from '../../API/boards';
import { tsQuerySelector } from '../../helpers/helpers';
import { getGeneralStatisticsBar, getGeneralStatisticsDoughnut } from '../../features/statistics/generalStatistics';
import toggleButtonStatistics from '../../features/statistics/toggleButtonStatistics';
import getIcons from '../../features/statistics/getIconsForStatistics';
import getStatisticsHTML from './statisticsHTML';
import { checkHideAside } from '../../features/hideAside/hideAside';

const StatisticsId = {
  render: async () => {
    const view = getStatisticsHTML();
    return view;
  },
  after_render: async () => {
    const link = <HTMLAnchorElement>document.querySelector('.aside-stats');
    link.classList.add('active-link');
    checkHideAside();

    document.body.classList.remove('body_home');
    const main = <HTMLElement>tsQuerySelector(document, '.main-statisticsId');
    const title = <HTMLElement>tsQuerySelector(document, '.statisticsId-title');

    const boardId = getBoardId();
    const board: Board = await getBoardsById(state.authToken, boardId);

    title.textContent = board.title;

    const alltasks: ITasks[] = await getTasksSetByBoardId(state.authToken, boardId);
    const columns: IColumns[] = await getColumnsInBoard(state.authToken, boardId);
    const [todo] = columns.filter((column) => column.title === UI.firstColumnName);
    const [inProgress] = columns.filter((column) => column.title === UI.secondColumnName);
    const [done] = columns.filter((column) => column.title === UI.thirdColumnName);

    const tasksInTodo = alltasks.filter((task) => task.columnId === todo._id).length;
    const tasksInProgress = alltasks.filter((task) => task.columnId === inProgress._id).length;
    const tasksInDone = alltasks.filter((task) => task.columnId === done._id).length;

    getGeneralStatisticsDoughnut(board, tasksInTodo, tasksInProgress, tasksInDone);
    getGeneralStatisticsBar(board, tasksInTodo, tasksInProgress, tasksInDone);

    if (board.users.length) {
      const MAX_VISIBLE_MEMBERS = Infinity;
      await getIcons(board.users, '.member-icons', MAX_VISIBLE_MEMBERS, boardId, todo, inProgress, done);

      const membersIcons = tsQuerySelector(document, '.member-icons');
      membersIcons.style.cssText = `
      position: static;
      display: flex;
      justify-content: space-between;
      margin-top: 3%;
      max-width: 450px;
      min-width: 320px;
      `;
    }

    toggleButtonStatistics();
    main.addEventListener('click', toggleButtonStatistics);
  },
};
export default StatisticsId;
