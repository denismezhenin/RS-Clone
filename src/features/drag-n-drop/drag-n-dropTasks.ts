import Sortable from 'sortablejs';
import { updateSetOfTasks } from '../../API/tasks';
import state from '../../state/state';
import { tsQuerySelectorAll } from '../../helpers/helpers';
import { DRAG_N_DROP_ANIMATION_TIME, DRAG_N_DROP_GROUP_TASK, TIME_LESS_TEN } from '../../constants/constants';
import { getColumnById } from '../../API/columns';
import getBoardId from '../../services/getBoardId';
import { getPointsByTaskId, updatePoints } from '../../API/points';
import { IColumns } from '../../data/types';

const getDate = () => {
  const date = new Date();
  return `${date.getDate() < TIME_LESS_TEN ? '0' + date.getDate() : date.getDate()}-${
    date.getMonth() < TIME_LESS_TEN ? '0' + date.getMonth() : date.getMonth()
  }-${date.getFullYear()} ${date.getHours() < TIME_LESS_TEN ? '0' + date.getHours() : date.getHours()}:${
    date.getMinutes() < TIME_LESS_TEN ? '0' + date.getMinutes() : date.getMinutes()
  }:${date.getSeconds()}`;
};

const getTimeForTasks = async (currentItem: HTMLElement, column: IColumns) => {
  const startDateContainer = currentItem.firstElementChild?.lastElementChild?.children[2].lastElementChild;
  const endDateContainer = currentItem.firstElementChild?.lastElementChild?.children[3].lastElementChild;

  if (column.title === 'In progress') {
    const pointByTaskId = await getPointsByTaskId(state.authToken, currentItem.id);
    const currentDate = getDate();

    startDateContainer!.innerHTML = pointByTaskId[0].startDate === '-' ? currentDate : pointByTaskId[0].startDate;
    endDateContainer!.innerHTML = '-';

    await updatePoints(state.authToken, pointByTaskId[0]._id, {
      title: 'string',
      done: false,
      startDate: pointByTaskId[0].startDate === '-' ? currentDate : pointByTaskId[0].startDate,
      endDate: '-',
    });
  }

  if (column.title === 'Done') {
    const pointByTaskId = await getPointsByTaskId(state.authToken, currentItem.id);
    const currentDate = getDate();

    endDateContainer!.innerHTML = pointByTaskId[0].endDate === '-' ? currentDate : pointByTaskId[0].endDate;

    await updatePoints(state.authToken, pointByTaskId[0]._id, {
      title: 'string',
      done: false,
      startDate: pointByTaskId[0].startDate === '-' ? currentDate : pointByTaskId[0].startDate,
      endDate: pointByTaskId[0].endDate === '-' ? currentDate : pointByTaskId[0].endDate,
    });
  }
};

const dragNdropTasks = () => {
  const tasksList = tsQuerySelectorAll(document, '.tasks-list');
  tasksList.forEach((el) =>
    Sortable.create(el as HTMLElement, {
      animation: DRAG_N_DROP_ANIMATION_TIME,
      group: {
        name: DRAG_N_DROP_GROUP_TASK,
      },
      onEnd: async function (e) {
        const currentItem = e.item;
        const prevTaskListArray = [...e.from.children].map((task, index) => ({
          _id: task.id,
          order: index,
          columnId: e.from.id.split('-')[1],
        }));
        const currentTaskListArray = [...e.to.children].map((task, index) => ({
          _id: task.id,
          order: index,
          columnId: e.to.id.split('-')[1],
        }));

        const resultTasksArray = [...prevTaskListArray, ...currentTaskListArray];

        const boardId = getBoardId();
        const column = await getColumnById(state.authToken, boardId, e.to.id.split('-')[1]);
        await getTimeForTasks(currentItem, column);

        await updateSetOfTasks(state.authToken, resultTasksArray);
      },
    })
  );
};
export default dragNdropTasks;
