import { ITasks, Arrows } from '../../data/types';
import state from '../../state/state';
import getTaskRowHtml from './getTaskRowHtml';
import sortTasks from '../../features/tasksPage/sortTasks';

const getTaskContainer = async (userTasks: ITasks[]) => {
  const table = document.querySelector('.tasks-table');
  const tableRows = document.createElement('div');
  tableRows.classList.add('rows');
  table?.append(tableRows);

  const promises: Promise<string>[] = [];
  const sortedTasks = sortTasks(userTasks);
  sortedTasks.forEach(async (el) => {
    const row = document.createElement('div');
    row.classList.add('task-row');
    tableRows?.append(row);
    row.setAttribute('id', el._id);
    row.setAttribute('data-board-id', el.boardId);
    promises.push(getTaskRowHtml(el, sortedTasks.indexOf(el)));
  });

  const rows = document.querySelectorAll('.task-row');

  Promise.all(promises).then((responses) => {
    rows.forEach((el, i) => {
      if (el instanceof HTMLDivElement) {
        el.innerHTML = responses[i];

        const priority = el.lastChild?.previousSibling;
        if (priority instanceof HTMLSpanElement) {
          const text = priority.textContent?.toLowerCase();
          if (text === 'low' || text === 'низкий') {
            priority.style.color = '#2ba700';
          } else if (text === 'medium' || text === 'средний') {
            priority.style.color = '#ffba53';
          } else {
            priority.style.color = '#ff7979';
          }
        }
      }
    });
  });

  const orderSign = state.order === 'ASC' ? Arrows.up : Arrows.down;
  const priorityHeader = document.querySelector('.priority-field');
  if (priorityHeader instanceof HTMLSpanElement) {
    priorityHeader.textContent =
      state.sort === 'priority'
        ? `${priorityHeader.textContent?.slice(0, priorityHeader.textContent.length - 1)} ${orderSign}`
        : priorityHeader.textContent;
  }
};

export default getTaskContainer;
