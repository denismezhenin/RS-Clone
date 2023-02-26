import Chart from 'chart.js/auto';
import { Board } from '../../data/types';
import { tsQuerySelector } from '../../helpers/helpers';

export const getGeneralStatisticsDoughnut = (
  board: Board,
  tasksInTodo: number,
  tasksInProgress: number,
  tasksInDone: number
) => {
  const generalDoughnut = <HTMLCanvasElement>tsQuerySelector(document, '.statisticsId-general__doughnut');

  const schedule = new Chart(generalDoughnut, {
    type: 'doughnut',
    data: {
      labels: ['Todo', 'In Progress', 'Done'],
      datasets: [
        {
          label: board.title,
          data: [tasksInTodo, tasksInProgress, tasksInDone],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          hoverOffset: 4,
        },
      ],
    },
  });
  return schedule;
};

export const getGeneralStatisticsBar = (
  board: Board,
  tasksInTodo: number,
  tasksInProgress: number,
  tasksInDone: number
) => {
  const generalBar = <HTMLCanvasElement>tsQuerySelector(document, '.statisticsId-general__bar');

  const schedule = new Chart(generalBar, {
    type: 'bar',
    data: {
      labels: ['Todo', 'In Progress', 'Done'],
      datasets: [
        {
          label: board.title,
          data: [tasksInTodo, tasksInProgress, tasksInDone],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        },
      ],
    },
  });
  return schedule;
};
