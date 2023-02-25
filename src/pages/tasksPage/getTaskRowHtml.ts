import { getColumnById } from '../../API/columns';
import { getPointsByTaskId } from '../../API/points';
import { ITasks, IColumns, IPointByTaskId } from '../../data/types';
import state from '../../state/state';

const getTaskRowHtml = async (task: ITasks, index: number) => {
  const taskColumn: IColumns = await getColumnById(state.authToken, task.boardId, task.columnId);
  const { title: taskColumnName } = taskColumn;

  const description = JSON.parse(task.description);

  const { duration, priority } = description;

  const points: IPointByTaskId[] = await getPointsByTaskId(state.authToken, task._id);
  const { endDate, startDate } = points[0];

  return `
    <span class="table-task-field number-ceil">${index + 1}</span>
    <span class="table-task-field title-ceil">${task.title}</span>
    <span class="table-task-field status-ceil">${taskColumnName}</span>
    <span class="table-task-field start-ceil">${startDate}</span>
    <span class="table-task-field end-ceil">${endDate}</span>
    <span class="table-task-field duration-ceil">${duration.toUpperCase()}</span>
    <span class="table-task-field priority-ceil">${priority.toUpperCase()}</span>
  `;
};

export default getTaskRowHtml;
