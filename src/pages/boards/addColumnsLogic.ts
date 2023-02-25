import state from '../../state/state';
import getBoardId from '../../services/getBoardId';
import setSelectedUserId from '../../features/setSelectedUserId';
import dragNdropTasks from '../../features/drag-n-drop/drag-n-dropTasks';
import dragNdropColumns from '../../features/drag-n-drop/drag-n-dropColumns';
import { tsQuerySelector, tsQuerySelectorAll } from '../../helpers/helpers';
import createTaskFormListener from '../taskForm/createNewTask';
import { editTitle, confirmEditColumns, deleteColumnInBoard } from '../../features/columns/EditColumns';
import { setNewTaskFormListener } from '../taskForm/taskFormlistenerFunction';
import { getPointsByTaskId } from '../../API/points';
import highlightTask from './highlightTask';
import { getBoardsById } from '../../API/boards';
import { Board } from '../../data/types';
import renderIconsInTask from '../../features/renderIcontsInTask';
import setTaskListener from '../../features/dropDownMenu';
import getBoardIcons from './getBoardIcons';
import { roastedTask } from '../../features/changeStatusOfTask';

const addColumnsLogic = async () => {
  const boardId = getBoardId();
  const board: Board = await getBoardsById(state.authToken, boardId);

  if (board.users.length) {
    await getBoardIcons(board.users, '.member-icons');
  }

  const membersSelect = <HTMLSelectElement>document.querySelector('.members-select');
  membersSelect.addEventListener('change', setSelectedUserId);
  await dragNdropColumns();
  await dragNdropTasks();

  const titleSettingEdit = tsQuerySelectorAll(document, '.title-setting__edit');
  titleSettingEdit.forEach((el) =>
    el.addEventListener('click', async (e) => {
      await editTitle(e, '.column', '.title-setting__edit', '.column-title', '.column-edit__form');
    })
  );

  const columnCofirmEdit = tsQuerySelectorAll(document, '.column-confirm-edit');
  columnCofirmEdit.forEach((el) => {
    el.addEventListener('click', (e) => confirmEditColumns(e, boardId));
  });

  const columnDeleteButton = tsQuerySelectorAll(document, '.column-delete__button');
  columnDeleteButton.forEach((el) => {
    el.addEventListener('click', (e) => deleteColumnInBoard(e, boardId));
  });

  const startDateContainer = [...tsQuerySelectorAll(document, '.start-date__container')];
  startDateContainer.map(async (el) => {
    const task = <HTMLElement>el.closest('.task');
    const { id } = task;

    const result = await getPointsByTaskId(state.authToken, id);
    const time = result[0].startDate ? result[0].startDate : null;
    if (time) {
      el.innerHTML = time;
      if (result[0].endDate === '-' && result[0].startDate !== '-') roastedTask(result[0].startDate, task);
    }
    if (result[0].startDate === '-') {
      tsQuerySelector(task, '.start-date').style.display = 'none';
    } else {
      tsQuerySelector(task, '.start-date').style.display = 'block';
    }
  });

  const endDateContainer = [...tsQuerySelectorAll<HTMLElement>(document, '.end-date__container')];
  endDateContainer.map(async (el) => {
    const task = <HTMLElement>el.closest('.task');
    const { id } = task;

    const result = await getPointsByTaskId(state.authToken, id);
    const time = result[0].endDate ? result[0].endDate : null;
    if (time) {
      el.innerHTML = time;
      if (result[0].endDate !== '-') tsQuerySelector(task, '.task__roasted-icon').style.display = 'block';
    }
    if (result[0].endDate === '-') {
      tsQuerySelector(task, '.end-date').style.display = 'none';
    } else {
      tsQuerySelector(task, '.end-date').style.display = 'block';
    }
  });
  await createTaskFormListener();

  if (state.selectedTask) {
    await highlightTask();
  }
  if (!state.pageLoaded) {
    await setTaskListener();
    await setNewTaskFormListener();
    state.pageLoaded = true;
  }
  await renderIconsInTask();
};

export default addColumnsLogic;
