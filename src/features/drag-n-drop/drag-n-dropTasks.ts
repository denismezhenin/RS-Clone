import Sortable from 'sortablejs';
import { updateSetOfTasks } from '../../API/tasks';
import state from '../../state/state';
import { tsQuerySelectorAll } from '../../helpers/helpers';
import { DRAG_N_DROP_ANIMATION_TIME, DRAG_N_DROP_GROUP_TASK } from '../../constants/constants';
import { getColumnById } from '../../API/columns';
import getBoardId from '../../services/getBoardId';
import { getPointsByTaskId, updatePoints } from '../../API/points';
import { IColumns } from '../../data/types';
import 'datejs';

const getDate = () => Date.today().setTimeToNow().toString('dd-MM-yyyy HH:mm');

const getTimeForTasks = async (currentItem: HTMLElement, column: IColumns) => {
  const startDateContainer =
    currentItem.firstElementChild?.lastElementChild?.children[2].lastElementChild?.children[1].lastElementChild;
  const endDateContainer =
    currentItem.firstElementChild?.lastElementChild?.children[2].lastElementChild?.children[2].lastElementChild;

  if (column.title === 'In progress') {
    const pointByTaskId = await getPointsByTaskId(state.authToken, currentItem.id);
    const currentDate = getDate();

    if (startDateContainer) {
      startDateContainer.innerHTML = pointByTaskId[0].startDate === '-' ? currentDate : pointByTaskId[0].startDate;
    }
    if (endDateContainer) {
      endDateContainer.innerHTML = '-';
    }
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
    if (endDateContainer) {
      endDateContainer.innerHTML = pointByTaskId[0].endDate === '-' ? currentDate : pointByTaskId[0].endDate;
    }

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
      async onEnd(e) {
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
