import Sortable from 'sortablejs';
import { updateSetOfTasks } from '../../API/tasks';
import state from '../../state/state';
import { getDate, tsQuerySelector, tsQuerySelectorAll } from '../../helpers/helpers';
import { DRAG_N_DROP_ANIMATION_TIME, DRAG_N_DROP_GROUP_TASK } from '../../constants/constants';
import { getColumnById } from '../../API/columns';
import getBoardId from '../../services/getBoardId';
import { getPointsByTaskId, updatePoints } from '../../API/points';
import { IColumns } from '../../data/types';
import 'datejs';
import UI from '../../data/UI';
import { roastedTask } from '../changeStatusOfTask';

const getTimeForTasks = async (currentItem: HTMLElement, column: IColumns) => {
  const startDateContainer = tsQuerySelector(currentItem, '.start-date__container');
  const endDateContainer = tsQuerySelector(currentItem, '.end-date__container');

  if (column.title === UI.secondColumnName || column.title === 'В работе') {
    const pointByTaskId = await getPointsByTaskId(state.authToken, currentItem.id);
    const currentDate = getDate();
    tsQuerySelector(currentItem, '.task__roasted-icon').style.display = 'none';
    if (startDateContainer) {
      startDateContainer.innerHTML = pointByTaskId[0].startDate === '-' ? currentDate : pointByTaskId[0].startDate;
      if (pointByTaskId[0].startDate !== '-') {
        roastedTask(pointByTaskId[0].startDate, currentItem);
      }
    }
    tsQuerySelector(currentItem, '.end-date').style.display = 'none';
    tsQuerySelector(currentItem, '.start-date').style.display = 'block';
    await updatePoints(state.authToken, pointByTaskId[0]._id, {
      title: 'string',
      done: false,
      startDate: pointByTaskId[0].startDate === '-' ? currentDate : pointByTaskId[0].startDate,
      endDate: '-',
    });
  }

  if (column.title === UI.thirdColumnName || column.title === 'Сделано') {
    const pointByTaskId = await getPointsByTaskId(state.authToken, currentItem.id);
    const currentDate = getDate();
    if (endDateContainer) {
      endDateContainer.innerHTML = pointByTaskId[0].endDate === '-' ? currentDate : pointByTaskId[0].endDate;
      startDateContainer.innerHTML = pointByTaskId[0].startDate === '-' ? currentDate : pointByTaskId[0].startDate;
      tsQuerySelector(currentItem, '.task__roasted-gif').style.display = 'none';
      tsQuerySelector(currentItem, '.task__roasted-icon').style.display = 'block';
    }
    tsQuerySelector(currentItem, '.end-date').style.display = 'block';
    tsQuerySelector(currentItem, '.start-date').style.display = 'block';

    await updatePoints(state.authToken, pointByTaskId[0]._id, {
      title: 'string',
      done: false,
      startDate: pointByTaskId[0].startDate === '-' ? currentDate : pointByTaskId[0].startDate,
      endDate: pointByTaskId[0].endDate === '-' ? currentDate : pointByTaskId[0].endDate,
    });
  }
};

const dragNdropTasks = async () => {
  const tasksList = <HTMLElement[]>[...tsQuerySelectorAll(document, '.tasks-list')];
  tasksList.forEach((el) =>
    Sortable.create(el, {
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
