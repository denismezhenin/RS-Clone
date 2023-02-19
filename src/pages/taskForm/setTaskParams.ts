import { taskForm } from '../../data/types';
import { tsQuerySelector } from '../../helpers/helpers';

const formsParam = (target: HTMLElement, taskType: taskForm) => {
  const board = tsQuerySelector(document, '.new-card__form');
  const submitButton = tsQuerySelector(document, '.create-card-action-submit');
  if (taskType === taskForm.edit) {
    submitButton.textContent = taskForm.editTask;
    board.dataset.type = taskForm.edit;
  } else {
    tsQuerySelector<HTMLFormElement>(document, '.new-card__form').reset();
    submitButton.textContent = taskForm.submitTask;
    board.dataset.type = taskForm.submit;
    tsQuerySelector(document, '.member-icons__task').innerHTML = '';
  }
  tsQuerySelector(document, '.new-card').classList.toggle('new-card__active');
  const boardId = target.closest('.main-board')?.id;
  const columId = target.closest('.column')?.id;
  const taskId = target.closest<HTMLElement>('.task')?.id;
  board.dataset.board = boardId;
  board.dataset.column = columId;
  board.dataset.task = taskId;
};

export default formsParam;
