import { Chart } from 'chart.js/auto';

import { getTasksSetByUserId } from '../../API/tasks';
import { tsQuerySelector } from '../../helpers/helpers';
import state from '../../state/state';
import { IColumns, ITasks } from '../../data/types';
import { getSpinner, removeSpinner } from '../spinner/spinner';

const getUserStatisticsBar = async (
  e: Event,
  boardId: string,

  todo: IColumns,
  inProgress: IColumns,
  done: IColumns,
  user: string
) => {
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;
  getSpinner();
  const statisticsIdUserDoughnut = <HTMLCanvasElement>tsQuerySelector(document, '.statisticsId-user__doughnut');
  statisticsIdUserDoughnut.remove();
  const canvas = document.createElement('canvas');
  canvas.className = 'statisticsId-user__doughnut';
  const userStatistics = tsQuerySelector(document, '.user-statistics');
  userStatistics.appendChild(canvas);

  const userId = String((<HTMLElement>target.closest('.user-icon')).dataset.memberId);
  const allTasks: ITasks[] = (await getTasksSetByUserId(state.authToken, userId)).filter(
    (item: ITasks) => item.boardId === boardId
  );

  const tasksInTodo = allTasks.filter((task) => task.columnId === todo._id && task.users.includes(userId)).length;
  const tasksInProgress = allTasks.filter(
    (task) => task.columnId === inProgress._id && task.users.includes(userId)
  ).length;
  const tasksInDone = allTasks.filter((task) => task.columnId === done._id && task.users.includes(userId)).length;

  // eslint-disable-next-line no-new
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Todo', 'In Progress', 'Done'],
      datasets: [
        {
          label: user,
          data: [tasksInTodo, tasksInProgress, tasksInDone],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        },
      ],
    },
  });
  removeSpinner();
};
export default getUserStatisticsBar;
