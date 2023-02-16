import { deleteTask } from '../API/tasks';
import { tsQuerySelector } from '../helpers/helpers';
import formsParam from '../pages/taskForm/setTaskParams';
import editTask from '../pages/taskForm/editTask';
import state from '../state/state';
import { taskForm } from '../data/types';

export const showDropDownMenu = (target: HTMLElement) => {
  const task = target.closest<HTMLElement>('.task');
  if (!task) return;
  // task.classList.toggle('hide');
  tsQuerySelector(task, '.task-menu__list').classList.toggle('hide');
};

export const setTaskListener = () => {
  document.addEventListener('click', async (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    const { target } = e;
    if (target.classList.contains('task-pop-up__menu')) {
      // console.log('yes');
      // // if (target.closest('.task') != null) {

      // // }
      // if (!target.closest('.task')) return;
      // const task = target.closest<HTMLElement>('.task');
      // if (!task) return;
      // // task.classList.toggle('hide');
      // tsQuerySelector(task, '.task-menu__list').classList.toggle('hide');
      showDropDownMenu(target);
    }
    // const board = tsQuerySelector(document, '.new-card__form')
    // const boardId = target.closest('.main-board')?.id
    // const columId = target.closest('.column')?.id
    // board.dataset.board = boardId
    // board.dataset.column = columId
    if (target.classList.contains('edit-task')) {
      formsParam(target, taskForm.edit);
      editTask(target);
      showDropDownMenu(target);
    }
    if (target.classList.contains('delete-task')) {
      const boardId = target.closest<HTMLElement>('.main-board')?.id;
      const columnId = target.closest<HTMLElement>('.column')?.id;
      const taskId = target.closest<HTMLElement>('.task')?.id;
      if (!boardId || !columnId || !taskId) return;
      await deleteTask(state.authToken, boardId, columnId, taskId);
      showDropDownMenu(target);
    }
  });
};