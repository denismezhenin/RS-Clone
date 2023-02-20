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
import getBoardIcons from './getBoardIcons';
import { getBoardsById } from '../../API/boards';
import { Board } from '../../data/types';
import renderIconsInTask from '../../features/renderIcontsInTask';
import setTaskListener from '../../features/dropDownMenu';

const addColumnsLogic = async () => {
  const boardId = getBoardId();
  // const main = tsQuerySelector(document, '.main-board');
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
    const { id } = <Element>el.closest('.task');

    const result = (await getPointsByTaskId(state.authToken, id))[0].startDate || null;
    if (result) {
      el.innerHTML = result;
    }
  });

  const endDateContainer = [...tsQuerySelectorAll(document, '.end-date__container')];
  endDateContainer.map(async (el) => {
    const { id } = <Element>el.closest('.task');

    const result = (await getPointsByTaskId(state.authToken, id))[0].endDate || null;
    if (result) {
      el.innerHTML = result;
    }
  });

  if (state.selectedTask) {
    await highlightTask();
  }
  if (!state.pageLoaded) {
    await setTaskListener();
    await setNewTaskFormListener();
    await createTaskFormListener();
    state.pageLoaded = true;
  }
  await renderIconsInTask();
};

export default addColumnsLogic;
