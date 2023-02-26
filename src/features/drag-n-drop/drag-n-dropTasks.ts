import Sortable from 'sortablejs';
import { updateSetOfTasks } from '../../API/tasks';
import state from '../../state/state';
import { getDate, tsQuerySelector, tsQuerySelectorAll } from '../../helpers/helpers';
import { DRAG_N_DROP_ANIMATION_TIME, DRAG_N_DROP_GROUP_TASK, duration } from '../../constants/constants';
import { getColumnById } from '../../API/columns';
import getBoardId from '../../services/getBoardId';
import { getPointsByTaskId, updatePoints } from '../../API/points';
import { IColumns } from '../../data/types';
import 'datejs';
import UI from '../../data/UI';
import { JavascriptModulesPlugin } from 'webpack';
import { roastedTask } from '../changeStatusOfTask';

const getTimeForTasks = async (currentItem: HTMLElement, column: IColumns) => {
  const startDateContainer = tsQuerySelector(currentItem, '.start-date__container');
  const endDateContainer = tsQuerySelector(currentItem, '.end-date__container');
  // const durationTime = tsQuerySelector(currentItem, '.task-time__duration').textContent?.toLocaleLowerCase();
  // if (!durationTime) return;
  // const hours = duration[durationTime];
  // console.log(hours);

  if (column.title === UI.secondColumnName || column.title === 'В работе') {
    const pointByTaskId = await getPointsByTaskId(state.authToken, currentItem.id);
    const currentDate = getDate();

    // console.log(Date.parse(currentDate));
    // console.log(Date.parse(pointByTaskId[0].startDate));
    // console.log(Date.parse(pointByTaskId[0].startDate).addHours(-hours));
    // console.log(Date.parse(currentDate).addHours(-hours * 0.8));

    // console.log(Date.parse(currentDate), )
    // console.log(Date.compare(Date.parse(currentDate).addHours(-hours * 0.8), Date.parse(pointByTaskId[0].startDate)));
    // console.log()
    tsQuerySelector(currentItem, '.task__roasted-icon').style.display = 'none';
    if (startDateContainer) {
      startDateContainer.innerHTML = pointByTaskId[0].startDate === '-' ? currentDate : pointByTaskId[0].startDate;
      if (pointByTaskId[0].startDate !== '-') {
        console.log('yrs')
        roastedTask(pointByTaskId[0].startDate, currentItem);
      }
      // const differenceInTime = Date.compare(
      //   Date.parse(currentDate).addHours(-hours * 0.8),
      //   Date.parse(pointByTaskId[0].startDate).addHours(hours)
      // );
      // console.log(Date.parse(currentDate))
      // console.log( Date.parse(currentDate).addHours(-hours * 0.8))
      // console.log(Date.parse(pointByTaskId[0].startDate).addHours(hours))
      // console.log(differenceInTime)
      // if (differenceInTime >= 0) {
      //   tsQuerySelector(currentItem, '.task__roasted-gif').style.display = 'block';
      // }

    }
    tsQuerySelector(currentItem, '.end-date').style.display = 'none';
    tsQuerySelector(currentItem, '.start-date').style.display = 'block';
    // if (endDateContainer) {
    //   endDateContainer.innerHTML = '-';
    // }
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
